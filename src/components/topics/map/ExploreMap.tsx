import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, FlexProps, Link, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { RoleAccess } from '../../auth/RoleAccess';
import { TopicLink } from '../../lib/links/TopicLink';
import { PageLink } from '../../navigation/InternalLink';
import { TopicDescription } from '../fields/TopicDescription';
import { NewTopicModal } from '../NewTopic';
import { TopicSubHeader, TopicSubHeaderData } from '../TopicSubHeader';
import {
  ExploreMapFocusedTopicCardDataFragment,
  GetTopicByIdExplorePageQuery,
  useGetTopicByIdExplorePageLazyQuery,
  useGetTopLevelTopicsLazyQuery,
} from './ExploreMap.generated';
import { Map } from './Map';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapTopicData } from './map.utils';
import { MapHeader, MapType } from './MapHeader';

export const ExploreMapFocusedTopicCardData = gql`
  fragment ExploreMapFocusedTopicCardData on Topic {
    ...MapTopicData
    description
    ...TopicSubHeaderData
    subTopics {
      subTopic {
        ...MapTopicData
      }
    }
    parentTopic {
      ...TopicLinkData
    }
  }
  ${TopicSubHeaderData}
  ${TopicLinkData}
  ${MapTopicData}
`;

export const getTopicByIdExplorePage = gql`
  query getTopicByIdExplorePage($topicId: String!) {
    getTopicById(topicId: $topicId) {
      ...ExploreMapFocusedTopicCardData
    }
  }
  ${ExploreMapFocusedTopicCardData}
`;

export const getTopLevelTopics = gql`
  query getTopLevelTopics {
    getTopLevelTopics {
      items {
        ...MapTopicData
      }
    }
  }
  ${MapTopicData}
`;

export const rootTopic: MapTopicDataFragment = {
  __typename: 'Topic',
  _id: 'root',
  key: 'root',
  name: 'Explore',
};

export interface ExploreMapProps {
  mapPxWidth: number;
  mapPxHeight: number;
  selectedTopicId?: string;
  onTopicChange?: (topicId: string) => void;
  direction: 'row' | 'column';
  mapContainerProps?: FlexProps;
}
export const ExploreMap: React.FC<ExploreMapProps> = ({
  mapPxWidth,
  mapPxHeight,
  selectedTopicId: propSelectedTopicId,
  onTopicChange,
  direction,
  mapContainerProps,
}) => {
  const router = useRouter();
  const urlSelectedTopicId = router.query.selectedTopicId;
  if (urlSelectedTopicId && typeof urlSelectedTopicId !== 'string')
    throw new Error(`Invalid url param urlSelectedTopicId ${urlSelectedTopicId}`);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(propSelectedTopicId);

  const [loadedTopic, setLoadedTopic] = useState<GetTopicByIdExplorePageQuery['getTopicById']>();
  const [selectedMapType, setSelectedMapType] = useState<MapType>(MapType.SUBTOPICS);
  const [subTopics, setSubtopics] = useState<MapTopicDataFragment[]>();
  const [parentTopic, setParentTopic] = useState<TopicLinkDataFragment>();

  const [getTopLevelDomainsLazyQuery, { loading: isTopLevelQueryLoading }] = useGetTopLevelTopicsLazyQuery({
    onCompleted(d) {
      d && setSubtopics(d.getTopLevelTopics.items);
      setLoadedTopic(rootTopic);
    },
    fetchPolicy: 'network-only',
  });

  const [getTopicById, { loading: isGetTopicLoading, refetch }] = useGetTopicByIdExplorePageLazyQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true, //https://github.com/apollographql/react-apollo/issues/3709
    onCompleted(d) {
      d && d.getTopicById.subTopics && setSubtopics(d.getTopicById.subTopics.map((i) => i.subTopic));
      setParentTopic(d.getTopicById.parentTopic || undefined);

      setLoadedTopic(d.getTopicById);
    },
  });
  const loading = isGetTopicLoading || isTopLevelQueryLoading;
  const loadTopic = (topicId?: string) => {
    if (!topicId || topicId === rootTopic._id) {
      getTopLevelDomainsLazyQuery();
      onTopicChange && onTopicChange(rootTopic._id);
    } else {
      getTopicById({ variables: { topicId } });
      onTopicChange && onTopicChange(topicId);
    }
  };

  useEffect(() => {
    loadTopic(selectedTopicId);
  }, [selectedTopicId]);

  return (
    <Stack direction={direction} spacing={4} alignItems="center">
      <Box
        borderBottomWidth={3}
        minH="148px"
        position="relative"
        borderBottomColor="teal.500"
        pb={2}
        borderLeftWidth={2}
        borderLeftColor="gray.300"
        pl={3}
        pr={2}
        flexGrow={1}
        display="flex"
        alignItems="stretch"
        justifyContent="stretch"
        {...(direction === 'column' && { width: `${mapPxWidth}px` })}
        {...(direction === 'row' && { maxHeight: `200px` })}
      >
        {!!loadedTopic && loadedTopic._id !== rootTopic._id ? (
          <ExploreMapFocusedTopicCard topic={loadedTopic} />
        ) : (
          <Text fontSize="3xl" fontWeight={700} color="gray.600">
            Explore Topics
          </Text>
        )}
        {isGetTopicLoading && (
          <Center position="absolute" top={0} right={0} p={2}>
            <Spinner />
          </Center>
        )}
      </Box>
      <Stack direction="column">
        <Center>
          <Stack spacing="2px">
            <MapHeader onChange={setSelectedMapType} value={selectedMapType} size="lg" />
            <Box boxShadow="lg" width={mapPxWidth + 'px'} {...mapContainerProps}>
              <Map
                mapType={selectedMapType}
                isLoading={loading || !subTopics}
                subTopics={subTopics || []}
                parentTopic={parentTopic}
                topic={loadedTopic}
                options={{ mode: 'explore', pxWidth: mapPxWidth, pxHeight: mapPxHeight }}
                onClick={(topic) => {
                  setSelectedTopicId(topic._id);
                }}
              />
            </Box>
          </Stack>
        </Center>
        <RoleAccess accessRule="loggedInUser">
          <Flex direction="row" justifyContent="center" pt={1} pb={1}>
            <NewTopicModal
              parentTopic={loadedTopic}
              renderButton={(openModal) => (
                <Link color="originalPalette.red" fontSize="md" fontWeight={600} onClick={() => openModal()}>
                  + Add SubTopic
                </Link>
              )}
            />
          </Flex>
        </RoleAccess>
      </Stack>
      {/* {loadedTopic && (
        <AddSubTopicModal
          parentTopicId={loadedTopic._id}
          isOpen={isOpen}
          onClose={onClose}
          onCancel={() => onClose()}
          onAdded={() => loadTopic(loadedTopic._id)}
        />
      )} */}
    </Stack>
  );
};

const ExploreMapFocusedTopicCard: React.FC<{
  topic: ExploreMapFocusedTopicCardDataFragment;
}> = ({ topic }) => {
  return (
    <Flex direction="row" alignItems="stretch" flexGrow={1}>
      <Box flexGrow={1}>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" alignItems="flex-start" pb={0}>
            <TopicLink topic={topic} size="2xl" newTab />
          </Stack>
          <TopicSubHeader topic={topic} subTopicsDisplay="count" />
          {topic.description && <TopicDescription topicDescription={topic.description} noOfLines={2} />}
        </Stack>
      </Box>
      <Center>
        <PageLink
          color="blue.500"
          display="flex"
          alignItems="baseline"
          fontSize="lg"
          pageInfo={TopicPageInfo(topic)}
          isExternal
        >
          Explore
          <ExternalLinkIcon ml="6px" boxSize={4} />
        </PageLink>
      </Center>
    </Flex>
  );
};