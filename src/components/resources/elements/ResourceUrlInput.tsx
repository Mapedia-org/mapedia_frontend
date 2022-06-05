import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useDebouncedCallback } from 'use-debounce';
import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { useAnalyzeResourceUrlLazyQuery } from '../../../graphql/resources/resources.operations.generated';
import { AnalyzeResourceUrlResult } from '../../../graphql/types';
import { routerPushToPage } from '../../../pages/PageInfo';
import { ResourcePageInfo } from '../../../pages/RoutesPageInfos';
import { validateUrl } from '../../../services/url.service';
import { theme } from '../../../theme/theme';
import { PageLink } from '../../navigation/InternalLink';
import { ResourceUrlLink } from './ResourceUrlLink';

export const useAnalyzeResourceUrl = ({
  value,
  onAnalyzed,
  enabled,
}: {
  enabled?: boolean;
  value?: string;
  onAnalyzed?: (resourceData: AnalyzeResourceUrlResult) => void;
}) => {
  const isValidUrl = useMemo(() => value && validateUrl(value), [value]);
  const debouncedAnalyzeResourceUrl = useDebouncedCallback(
    (url: string) => analyzeResourceUrl({ variables: { url } }),
    300
  );
  useEffect(() => {
    if (!!value && enabled && isValidUrl) {
      debouncedAnalyzeResourceUrl.callback(value);
    }
    return () => debouncedAnalyzeResourceUrl.cancel();
  }, [value]);

  const [existingResource, setExistingResource] = useState<ResourceDataFragment>();

  const [analyzeResourceUrl, { loading }] = useAnalyzeResourceUrlLazyQuery({
    fetchPolicy: 'no-cache',

    onCompleted(data) {
      setExistingResource(undefined);
      onAnalyzed && onAnalyzed(data.analyzeResourceUrl);
    },
    onError(err) {
      const errorCodes = err.graphQLErrors.map((gqlErr) => gqlErr.extensions.code);
      const existingResourceErrorIndex = errorCodes.indexOf('RESOURCE_ALREADY_EXISTS');
      if (existingResourceErrorIndex > -1) {
        const error = err.graphQLErrors[existingResourceErrorIndex];
        if (!error.extensions.existingResource)
          throw new Error('existingResource not supplied in RESOURCE_ALREADY_EXISTS error');
        setExistingResource(error.extensions.existingResource);
      }
    },
  });
  return { existingResource, isValidUrl, reset: () => setExistingResource(undefined), isAnalysing: loading };
};
interface ResourceUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  existingResource?: ResourceDataFragment;
  isAnalysing: boolean;
  isValidUrl: boolean;
  resetExistingResource: () => void;
}
export const ResourceUrlInput: React.FC<ResourceUrlInputProps> = ({
  value,
  onChange,
  isInvalid,
  existingResource,
  isAnalysing,
  isValidUrl,
  resetExistingResource,
}) => {
  const closeAlertDialog = useCallback(() => {
    onChange('');
    resetExistingResource();
  }, []);

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <InputGroup>
        <Input
          bgColor="white"
          zIndex={1}
          isInvalid={(!!value && !isValidUrl) || isInvalid}
          placeholder="https://example.com"
          size="md"
          value={value}
          {...(!!value &&
            isValidUrl && {
              color: 'blue.500',
              textDecoration: 'underline',
            })}
          onChange={(e) => onChange(e.target.value)}
        ></Input>
        <InputRightElement w="auto" display="flex" justifyContent="center">
          <Stack direction="row" align="center" mr={2}>
            {isAnalysing && <BeatLoader size={8} margin={2} color={theme.colors.main} />}

            {value && (
              <Link
                href={value}
                isExternal
                onClick={(e) => {
                  if (!isValidUrl) e.preventDefault(); // Not good for accessibility. Refactor to entirely remove link
                }}
              >
                <IconButton
                  isDisabled={!isValidUrl}
                  size="xs"
                  aria-label="Open link"
                  variant="ghost"
                  color={isValidUrl ? 'blue.500' : 'red.400'}
                  icon={<ExternalLinkIcon />}
                />
              </Link>
            )}
          </Stack>
        </InputRightElement>
      </InputGroup>

      {existingResource && (
        <AlertDialog isOpen={!!existingResource} leastDestructiveRef={cancelRef} onClose={closeAlertDialog}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Resource already exists
              </AlertDialogHeader>

              <AlertDialogBody display="flex" flexDir="column" alignItems="stretch">
                <Text textAlign="center" fontWeight={500}>
                  A resource with the url <br />
                  <ResourceUrlLink resource={existingResource} maxLength={40} /> already exists
                </Text>
                <Center py={8}>
                  <PageLink
                    pageInfo={ResourcePageInfo(existingResource)}
                    fontWeight={600}
                    fontSize="lg"
                    color="gray.700"
                    isExternal
                  >
                    {existingResource.name}
                    <ExternalLinkIcon ml={1} />
                  </PageLink>
                </Center>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Stack direction="row">
                  <Button ref={cancelRef} onClick={closeAlertDialog} variant="outline">
                    Close
                  </Button>
                  <Button onClick={() => routerPushToPage(ResourcePageInfo(existingResource))} colorScheme="blue">
                    Go to existing Resource
                  </Button>
                </Stack>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};
