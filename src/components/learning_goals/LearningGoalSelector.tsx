import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { CreateLearningGoalPayload } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { useSearchLearningGoalsLazyQuery } from './LearningGoalSelector.generated';
import { NewLearningGoal } from './NewLearningGoal';

export const searchLearningGoals = gql`
  query searchLearningGoals($options: SearchLearningGoalsOptions!) {
    searchLearningGoals(options: $options) {
      items {
        ...LearningGoalData
        # TODO: use proper fragment
      }
    }
  }
  ${LearningGoalData}
`;

export const LearningGoalSelector: React.FC<{
  onSelect: (learningGoal: LearningGoalDataFragment) => void;
  placeholder?: string;
  popoverTitle?: string;
}> = ({ onSelect, placeholder, popoverTitle }) => {
  const [searchResults, setSearchResults] = useState<LearningGoalDataFragment[]>([]);

  const [searchLearningGoalsLazyQuery, { data }] = useSearchLearningGoalsLazyQuery();

  const debouncedSearchResourcesLazyQuery = useDebouncedCallback(
    (query: string) => searchLearningGoalsLazyQuery({ variables: { options: { query, pagination: { limit: 10 } } } }),
    300
  );

  useEffect(() => {
    if (!!data?.searchLearningGoals.items) setSearchResults(data.searchLearningGoals.items);
  }, [data]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createLGDefaultPayload, setCreateLGDefaultPayload] = useState<Partial<CreateLearningGoalPayload>>({});

  return (
    <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement="bottom" closeOnBlur={false} isLazy>
      <PopoverTrigger>
        <Box>
          <EntitySelector
            width="100%"
            acceptCreation
            onCreate={(newLg) => {
              setCreateLGDefaultPayload({ name: newLg.name, key: generateUrlKey(newLg.name) }); //TODO: proper validation
              onOpen();
            }}
            suggestionContainerWidth="300px"
            placeholder={placeholder || 'Search learning goal...'}
            entitySuggestions={searchResults}
            fetchEntitySuggestions={(query) =>
              query.length >= 3 ? debouncedSearchResourcesLazyQuery.callback(query) : setSearchResults([])
            }
            onSelect={onSelect}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">{popoverTitle || 'Create Learning Goal'}</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <NewLearningGoal
            defaultPayload={createLGDefaultPayload}
            onCreated={(createdLearningGoal) => {
              onSelect(createdLearningGoal);
              onClose();
            }}
            onCancel={() => onClose()}
            size="sm"
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
