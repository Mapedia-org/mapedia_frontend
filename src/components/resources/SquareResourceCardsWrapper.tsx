import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourceSelectorModal } from './ResourceSelector';
import { SquareResourceCard, SquareResourceCardContainer } from './SquareResourceCard';
import { SquareResourceCardDataFragment } from './SquareResourceCard.generated';

interface SquareResourceCardWrapperProps {
  resources: SquareResourceCardDataFragment[];
  onRemove?: (resource: SquareResourceCardDataFragment) => void;
  onAdd?: (resource: ResourceDataFragment) => void;
  editable?: boolean;
  isLoading?: boolean;
  defaultAttachedDomains?: DomainDataFragment[];
}

export const SquareResourceCardWrapper: React.FC<SquareResourceCardWrapperProps> = ({
  resources,
  onRemove,
  onAdd,
  editable,
  isLoading,
  defaultAttachedDomains,
}) => {
  return (
    <Wrap>
      {resources.map((resource) => (
        <WrapItem key={resource._id}>
          <SquareResourceCard resource={resource} onRemove={editable ? onRemove : undefined} />
        </WrapItem>
      ))}
      {onAdd && editable && (
        <WrapItem>
          <SquareResourceCardContainer>
            <Stack align="center" spacing={2}>
              <ResourceSelectorModal
                onSelect={(subResource) => onAdd(subResource)}
                defaultAttachedDomains={defaultAttachedDomains}
                renderButton={({ openModal }) => (
                  <IconButton
                    aria-label="add resource"
                    icon={<AddIcon />}
                    size="lg"
                    isRound
                    onClick={() => openModal()}
                    isDisabled={isLoading}
                  />
                )}
              />
              <Text fontWeight={500}>Add resource</Text>
            </Stack>
          </SquareResourceCardContainer>
        </WrapItem>
      )}
    </Wrap>
  );
};
