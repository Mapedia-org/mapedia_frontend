import { EditIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Skeleton,
  SlideFade,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AiOutlineEye } from '@react-icons/all-files/ai/AiOutlineEye';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  EditableLearningMaterialPrerequisites,
  EditableLearningMaterialPrerequisitesData,
} from '../../components/learning_materials/EditableLearningMaterialPrerequisites';
import {
  LearningMaterialStarsRater,
  LearningMaterialStarsRaterData,
} from '../../components/learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../../components/learning_materials/LearningMaterialTagsEditor';
import { LearningPathComplementaryResourcesManager } from '../../components/learning_paths/LearningPathComplementaryResourcesManager';
import {
  LearningPathCompletion,
  LearningPathCompletionData,
} from '../../components/learning_paths/LearningPathCompletion';
import { LearningPathPublishButton } from '../../components/learning_paths/LearningPathPublishButton';
import { LearningPathResourceItemsManager } from '../../components/learning_paths/LearningPathResourceItems';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { OtherLearnersViewer } from '../../components/lib/OtherLearnersViewer';
import { StarsRatingViewer } from '../../components/lib/StarsRating';
import { EditableDuration } from '../../components/resources/elements/Duration';
import { EditableLearningMaterialCoveredTopics } from '../../components/learning_materials/EditableLearningMaterialCoveredTopics';
import { SquareResourceCardData } from '../../components/resources/SquareResourceCard';
import { UserAvatar, UserAvatarData } from '../../components/users/UserAvatar';
import { LearningMaterialWithCoveredTopicsData } from '../../graphql/learning_materials/learning_materials.fragments';
import {
  generateLearningPathData,
  LearningPathWithResourceItemsPreviewData,
} from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { useDeleteLearningPath } from '../../graphql/learning_paths/learning_paths.hooks';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { DiscussionLocation, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { GetLearningPathPageQuery, useGetLearningPathPageQuery } from './LearningPathPage.generated';
import { generateResourcePreviewCardData } from '../../graphql/resources/resources.fragments';
import { Discussion, DiscussionData } from '../../components/social/comments/Discussion';
import { EditableLearningMaterialDescription } from '../../components/learning_materials/LearningMaterialDescription';
import {
  LearningMaterialShowedIn,
  LearningMaterialShowedInData,
} from '../../components/learning_materials/LearningMaterialShowedIn';
import { LearningMaterialShowedInField } from '../../components/learning_materials/LearningMaterialShowedInField';
import {
  useHideLearningMaterialFromTopicMutation,
  useShowLearningMaterialInTopicMutation,
} from '../../graphql/learning_materials/learning_materials.operations.generated';
import { differenceBy } from 'lodash';

export const getLearningPathPage = gql`
  query getLearningPathPage($key: String!) {
    getLearningPathByKey(learningPathKey: $key) {
      ...LearningPathWithResourceItemsPreviewData
      complementaryResources {
        ...SquareResourceCardData
      }
      rating
      tags {
        name
      }
      createdBy {
        ...UserAvatarData
      }
      startedBy(options: {}) {
        items {
          user {
            ...UserAvatarData
          }
        }
        count
      }
      ...LearningPathCompletionData
      ...LearningMaterialWithCoveredTopicsData
      ...EditableLearningMaterialPrerequisitesData
      ...LearningMaterialStarsRaterData
      ...LearningMaterialShowedInData
      comments(options: { pagination: {} }) {
        ...DiscussionData
      }
    }
  }
  ${LearningMaterialWithCoveredTopicsData}
  ${LearningPathWithResourceItemsPreviewData}
  ${SquareResourceCardData}
  ${LearningPathCompletionData}
  ${UserAvatarData}
  ${EditableLearningMaterialPrerequisitesData}
  ${LearningMaterialStarsRaterData}
  ${DiscussionData}
  ${LearningMaterialShowedInData}
`;

const learningPathPlaceholder: GetLearningPathPageQuery['getLearningPathByKey'] = {
  ...generateLearningPathData(),
  durationSeconds: 100,
  tags: [{ name: 'tag 1' }],
  public: true,
  rating: 4.5,
  resourceItems: [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      resource: generateResourcePreviewCardData(),
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      resource: generateResourcePreviewCardData(),
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      resource: generateResourcePreviewCardData(),
    },
  ],
};

export const LearningPathPage: React.FC<{ learningPathKey: string }> = ({ learningPathKey }) => {
  const [updateLearningPath] = useUpdateLearningPathMutation();

  const [hideLearningMaterialFromTopic] = useHideLearningMaterialFromTopicMutation();
  const [showLearningMaterialInTopic] = useShowLearningMaterialInTopicMutation();

  const { data, loading, error, refetch } = useGetLearningPathPageQuery({
    variables: { key: learningPathKey },
  });
  const titleFontSize = useBreakpointValue({ base: '3xl', sm: '4xl', md: '5xl' }, 'md');
  const learningPath = data?.getLearningPathByKey || learningPathPlaceholder;
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningPath.createdBy && !!currentUser && learningPath.createdBy._id === currentUser._id,
    [learningPath, currentUser]
  );
  const [editMode, setEditMode] = useState(currentUserIsOwner);
  useEffect(() => {
    setEditMode(currentUserIsOwner);
  }, [learningPath._id]);

  const currentUserStartedPath = useMemo(() => !!learningPath.started, [learningPath]);

  const currentUserCompletedPath = useMemo(
    () =>
      currentUserStartedPath &&
      !!learningPath.resourceItems?.length &&
      learningPath.resourceItems.every(({ resource }) => resource.consumed?.consumedAt),
    [currentUserStartedPath, learningPath.resourceItems]
  );

  if (error) return null;
  return (
    <PageLayout
      isLoading={loading}
      marginSize="md"
      centerChildren
      renderTopRight={
        <LearningPathPageRightIcons
          learningPath={learningPath}
          currentUserIsOwner={currentUserIsOwner}
          isDisabled={loading}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      }
      renderTopLeft={
        editMode ? (
          <LearningMaterialShowedInField
            value={learningPath.showedIn || []}
            onChange={async (updatedShowedIn) => {
              const hideFromTopics = differenceBy(learningPath.showedIn || [], updatedShowedIn, (topic) => topic._id);
              const showInTopics = differenceBy(updatedShowedIn, learningPath.showedIn || [], (topic) => topic._id);
              await Promise.all([
                ...hideFromTopics.map((hideFromTopic) =>
                  hideLearningMaterialFromTopic({
                    variables: { topicId: hideFromTopic._id, learningMaterialId: learningPath._id },
                  })
                ),
                ...showInTopics.map((showInTopic) =>
                  showLearningMaterialInTopic({
                    variables: {
                      topicId: showInTopic._id,
                      learningMaterialId: learningPath._id,
                    },
                  })
                ),
              ]);
            }}
          />
        ) : (
          <LearningMaterialShowedIn learningMaterial={learningPath} size="md" />
        )
      }
    >
      <Stack w="100%">
        <Center>
          <EditableTextInput
            centered
            value={learningPath.name}
            isLoading={loading}
            onChange={(newName) =>
              updateLearningPath({ variables: { _id: learningPath._id, payload: { name: newName } } })
            }
            editMode={editMode}
            fontSize={titleFontSize}
          />
        </Center>
        <Flex direction={{ base: 'column', md: 'row' }} alignItems="stretch">
          <Flex direction="column" justifyContent="space-between" alignItems="stretch" minWidth={{ md: '260px' }}>
            <Stack spacing={2} pb={2}>
              <Center>
                <EditableLearningMaterialPrerequisites
                  editable={editMode}
                  learningMaterial={learningPath}
                  isLoading={loading}
                />
              </Center>
              {/* <Center>
                <EditableLearningMaterialOutcomes
                  editable={editMode}
                  learningMaterial={learningPath}
                  isLoading={loading}
                />
              </Center> */}
            </Stack>
          </Flex>
          <Stack flexGrow={1} px={4}>
            <Center>
              <Stack direction="row" alignItems="center" spacing={2}>
                <EditableLearningMaterialTags
                  justify="center"
                  learningMaterial={learningPath}
                  isLoading={loading}
                  isDisabled={!editMode}
                  placeholder="Add tags"
                  size="md"
                />
                <EditableDuration
                  defaultValue={learningPath.durationSeconds}
                  onSubmit={(newDuration) =>
                    newDuration !== learningPath.durationSeconds &&
                    updateLearningPath({
                      variables: { _id: learningPath._id, payload: { durationSeconds: newDuration } },
                    })
                  }
                  placeholder="Estimated Duration"
                  isDisabled={!editMode}
                  isLoading={loading}
                />
              </Stack>
            </Center>
            {/* TODO */}
            {/* <Stack direction="row" justifyContent="center" spacing={2} alignItems="center"> */}
            {/* <StarsRatingViewer value={learningPath.rating} isLoading={loading} /> */}
            {/* <RoleAccess accessRule="contributorOrAdmin">
                <LearningMaterialStarsRater learningMaterial={learningPath} isDisabled={loading} />
              </RoleAccess> */}
            {/* </Stack> */}
            <Skeleton isLoaded={!loading}>
              <EditableLearningMaterialDescription
                textAlign="center"
                minRows={3}
                justifyContent="center"
                backgroundColor="backgroundColor.0"
                defaultValue={learningPath.description || ''}
                placeholder="Add a description..."
                onSubmit={(newDescription: any) =>
                  updateLearningPath({
                    variables: {
                      _id: learningPath._id,
                      payload: { description: newDescription },
                    },
                  })
                }
                isDisabled={!editMode}
              />
            </Skeleton>
          </Stack>
          <Flex minWidth="260px" direction="column" alignItems="center">
            <EditableLearningMaterialCoveredTopics
              // w="260px"
              editable={editMode}
              isLoading={loading}
              learningMaterial={learningPath}
            />
          </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          {learningPath.resourceItems?.length ? (
            <LearningPathCompletion w="100px" learningPath={learningPath} />
          ) : (
            <Box />
          )}
          <Center w="260px">
            <Stack>
              {learningPath.createdBy && (
                <Center>
                  {currentUserIsOwner ? (
                    <Stack direction="column" alignItems="center">
                      <Text fontWeight={300}>You are the owner</Text>

                      {learningPath.public ? (
                        <Badge colorScheme="green">PUBLIC</Badge>
                      ) : (
                        <LearningPathPublishButton size="md" learningPath={learningPath} />
                      )}
                    </Stack>
                  ) : (
                    <Stack spacing={1}>
                      <Text fontWeight={300}>Created By</Text>
                      <Center>
                        <UserAvatar size="sm" user={learningPath.createdBy} />
                      </Center>
                      {currentUserIsOwner && <Badge colorScheme="green">PUBLIC</Badge>}
                    </Stack>
                  )}
                </Center>
              )}
              {learningPath.startedBy && (
                <OtherLearnersViewer
                  users={learningPath.startedBy.items.map(({ user }) => user)}
                  totalCount={learningPath.startedBy.count}
                  currentUserIsLearner={currentUserStartedPath}
                  minUsers={1}
                  title={(otherLearnersCount) =>
                    `Path taken by ${otherLearnersCount} ${otherLearnersCount === 1 ? 'user' : 'users'}`
                  }
                />
              )}
            </Stack>
          </Center>
        </Flex>
        {!learningPath.resourceItems?.length && (
          <Flex justify="center">
            <Heading size="md" color="blue.600">
              Start adding resources
            </Heading>
          </Flex>
        )}
        <LearningPathResourceItemsManager
          editMode={editMode}
          learningPath={learningPath}
          isLoading={loading}
          currentUserStartedPath={currentUserStartedPath}
          {...(!learningPath.resourceItems?.length && { resourceSelectorButtonColorScheme: 'blue' })}
        />

        <Skeleton isLoaded={!loading}>
          <EditableLearningMaterialDescription
            textAlign="center"
            minRows={3}
            justifyContent="center"
            backgroundColor="backgroundColor.0"
            defaultValue={learningPath.outro || ''}
            placeholder="Add a conclusion..."
            onSubmit={(newOutro: any) =>
              updateLearningPath({
                variables: {
                  _id: learningPath._id,
                  payload: { outro: newOutro },
                },
              })
            }
            isDisabled={!editMode}
            pt={8}
            pb={6}
          />
        </Skeleton>
        <SimpleGrid pt={5} columns={{ base: 1, md: currentUserCompletedPath ? 2 : 1 }} spacing={10}>
          {currentUserCompletedPath && (
            <SlideFade in={currentUserCompletedPath}>
              <Stack direction="column">
                <Heading color="teal.500" size="md" textAlign="center">
                  Congratulations!
                </Heading>
                <Text textAlign="center">You just finished this learning path!</Text>
                {/* TODO */}
                {/* {!currentUserIsOwner && (
                  <>
                    <Text textAlign="center" mt={3}>
                      Let the creator know if this was useful for you by leaving a rating:
                    </Text>
                    <Center pt={3}>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <StarsRatingViewer value={learningPath.rating} isLoading={loading} />
                        <LearningMaterialStarsRater
                          buttonText="Rate this path"
                          learningMaterial={learningPath}
                          isDisabled={loading}
                          size="md"
                        />
                      </Stack>
                    </Center>
                  </>
                )} */}
              </Stack>
            </SlideFade>
          )}

          <LearningPathComplementaryResourcesManager
            editMode={editMode}
            learningPathId={learningPath._id}
            complementaryResources={learningPath.complementaryResources || []}
            isLoading={loading}
          />
        </SimpleGrid>

        <Flex justify="flex-end">
          {!learningPath.public && <LearningPathPublishButton size="lg" learningPath={learningPath} />}
        </Flex>
        <Flex direction="column" alignItems="stretch" pt={20}>
          <Discussion
            title="Comments"
            discussionLocation={DiscussionLocation.LearningMaterialPage}
            discussionEntityId={learningPath._id}
            commentResults={learningPath.comments || undefined}
            refetch={() => refetch()}
            isLoading={loading}
          />
        </Flex>
      </Stack>
    </PageLayout>
  );
};

const LearningPathPageRightIcons: React.FC<{
  learningPath: LearningPathDataFragment;
  isDisabled?: boolean;
  currentUserIsOwner: boolean;
  setEditMode: (editMode: boolean) => void;
  editMode: boolean;
}> = ({ learningPath, isDisabled, currentUserIsOwner, editMode, setEditMode }) => {
  const { deleteLearningPath } = useDeleteLearningPath();
  const { currentUser } = useCurrentUser();
  return currentUser && (currentUserIsOwner || currentUser.role === UserRole.Admin) ? (
    <Stack direction="row" spacing={3}>
      <Stack direction="row" spacing={1}>
        <Tooltip label="Preview Mode" aria-label="preview learning path">
          <IconButton
            aria-label="view mode"
            size="md"
            variant="ghost"
            onClick={() => setEditMode(false)}
            isActive={!editMode}
            icon={<AiOutlineEye />}
            _focus={{}}
          />
        </Tooltip>
        <Tooltip label="Edit Mode" aria-label="edit learning path">
          <IconButton
            aria-label="edit mode"
            size="md"
            onClick={() => setEditMode(true)}
            variant="ghost"
            isActive={editMode}
            icon={<EditIcon />}
            _focus={{}}
          />
        </Tooltip>
      </Stack>

      <DeleteButtonWithConfirmation
        variant="outline"
        size="md"
        modalHeaderText="Delete Learning Path"
        modalBodyText={`Confirm deleting the learning path "${learningPath.name}" ?`}
        isDisabled={isDisabled}
        onConfirmation={() => deleteLearningPath({ variables: { _id: learningPath._id } }).then(() => Router.push('/'))}
      />
    </Stack>
  ) : null;
};
