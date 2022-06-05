import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, LinkProps, Skeleton, Text, TextProps } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useSetResourceOpenedMutation } from '../../../graphql/resources/resources.operations.generated';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { toUrlPreview } from '../../../services/url.service';
import { ResourceUrlDataFragment } from './ResourceUrlLink.generated';

export const ResourceUrlData = gql`
  fragment ResourceUrlData on Resource {
    _id
    consumed {
      openedAt
      lastOpenedAt
      consumedAt
    }
    url
  }
`;

export const ResourceUrlLinkWrapper: React.FC<
  {
    resource: ResourceUrlDataFragment;
    isLoading?: boolean;
  } & Omit<LinkProps, 'href' | 'onClick' | 'isExternal' | 'resource'>
> = ({ resource, isLoading, children, ...linkProps }) => {
  const [setResourceOpened] = useSetResourceOpenedMutation({ variables: { resourceId: resource._id } });
  const { currentUser } = useCurrentUser();
  return (
    <Skeleton isLoaded={!isLoading} as="span">
      <Link
        {...linkProps}
        href={resource.url}
        onClick={() => {
          !!currentUser && setResourceOpened();
        }}
        isExternal
      >
        {children}
      </Link>
    </Skeleton>
  );
};

export const ResourceUrlLinkViewer: React.FC<
  {
    resource: ResourceUrlDataFragment;
    maxLength?: number;
    size?: 'sm' | 'md' | 'lg';
  } & Omit<TextProps, 'resource' | 'size'>
> = ({ resource, maxLength, size, ...props }) => {
  return (
    <Text
      as="span"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      color={resource.consumed && resource.consumed.openedAt ? 'blue.700' : 'blue.400'}
      fontSize={size}
      fontWeight={500}
      {...props}
    >
      {toUrlPreview(resource.url, maxLength)}
      <ExternalLinkIcon mx="2px" />
    </Text>
  );
};
export const ResourceUrlLink: React.FC<
  {
    resource: ResourceUrlDataFragment;
    isLoading?: boolean;
    maxLength?: number;
    size?: 'sm' | 'md' | 'lg';
  } & Omit<LinkProps, 'size' | 'href' | 'onClick' | 'isExternal' | 'resource'>
> = ({ resource, isLoading, maxLength, children, size = 'md', ...linkProps }) => {
  return (
    <ResourceUrlLinkWrapper resource={resource} isLoading={isLoading} {...linkProps}>
      <ResourceUrlLinkViewer resource={resource} maxLength={maxLength} size={size} />
    </ResourceUrlLinkWrapper>
  );
};
