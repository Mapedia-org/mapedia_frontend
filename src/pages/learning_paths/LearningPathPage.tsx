import { Editable, EditableInput, EditablePreview, IconButton, Skeleton, Stack, Text } from '@chakra-ui/core';
import { EditIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { generateLearningPathData, LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { useDeleteLearningPath } from '../../graphql/learning_paths/learning_paths.hooks';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { PageInfo } from '../PageInfo';
import { GetLearningPathPageQuery, useGetLearningPathPageQuery } from './LearningPathPage.generated';
export const LearningPathPagePath = (learningPathKey: string = '[learningPathKey]') =>
  `/learning_paths/${learningPathKey}`;

export const LearningPathPageInfo = (learningPath: Pick<LearningPathDataFragment, 'key' | 'name'>): PageInfo => ({
  name: learningPath.name,
  path: LearningPathPagePath(learningPath.key),
  routePath: LearningPathPagePath(),
});

export const getLearningPathPage = gql`
  query getLearningPathPage($key: String!) {
    getLearningPathByKey(key: $key) {
      ...LearningPathData
    }
  }
  ${LearningPathData}
`;

const learningPathPlaceholder: GetLearningPathPageQuery['getLearningPathByKey'] = {
  ...generateLearningPathData(),
};

export const LearningPathPage: React.FC<{ learningPathKey: string }> = ({ learningPathKey }) => {
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const { data, loading, error } = useGetLearningPathPageQuery({ variables: { key: learningPathKey } });
  const learningPath = data?.getLearningPathByKey || learningPathPlaceholder;
  if (error) return null;
  return (
    <PageLayout
      isLoading={loading}
      centerChildren
      renderTopRight={<LearningPageRightIcons learningPath={learningPath} isDisabled={loading} />}
    >
      <Stack
        width={{ base: '100%', md: '80%' }}
        maxWidth={{
          base: '100%',
          md: '1800px',
        }}
      >
        <Stack width="50%">
          <Skeleton isLoaded={!loading}>
            <Editable
              // textAlign="center"
              defaultValue={learningPath.name}
              fontSize="5xl"
              fontWeight={600}
              color="gray.700"
              isPreviewFocusable={false}
              // submitOnBlur={false}
              onSubmit={(newName) =>
                updateLearningPath({ variables: { _id: learningPath._id, payload: { name: newName } } })
              }
              variant="solid"
              display="flex"
            >
              {(props: any) => (
                <>
                  <EditablePreview />
                  {!props.isEditing && (
                    <IconButton
                      aria-label="t"
                      icon={<EditIcon />}
                      onClick={props.onEdit}
                      size="xs"
                      color="gray.600"
                      alignSelf="end"
                    />
                  )}
                  <EditableInput />
                </>
              )}
            </Editable>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text>
              <IconButton aria-label="t" icon={<EditIcon />} size="xs" color="gray.600" alignSelf="end" />
            </Text>
          </Skeleton>
        </Stack>
      </Stack>
    </PageLayout>
  );
};

const LearningPageRightIcons: React.FC<{ learningPath: LearningPathDataFragment; isDisabled?: boolean }> = ({
  learningPath,
  isDisabled,
}) => {
  const { deleteLearningPath } = useDeleteLearningPath();
  return (
    <DeleteButtonWithConfirmation
      modalHeaderText="Delete Learning Path"
      modalBodyText={`Confirm deleting the learning path "${learningPath.name}" ?`}
      isDisabled={isDisabled}
      onConfirmation={() => deleteLearningPath({ variables: { _id: learningPath._id } }).then(() => Router.back())}
    />
  );
};
