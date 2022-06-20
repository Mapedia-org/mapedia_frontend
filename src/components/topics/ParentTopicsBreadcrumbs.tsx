import React from 'react';
import { Skeleton, Stack, Text, useBreakpointValue, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../graphql/topics/topics.fragments';
import { ParentTopicsBreadcrumbsDataFragment } from './ParentTopicsBreadcrumbs.generated';
import { TopicLink } from '../lib/links/TopicLink';

export const ParentTopicsBreadcrumbsData = gql`
  fragment ParentTopicsBreadcrumbsData on Topic {
    ...TopicLinkData
    parentTopic {
      ...TopicLinkData
      parentTopic {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;
export const ParentTopicsBreadcrumbs: React.FC<{ topic: ParentTopicsBreadcrumbsDataFragment; isLoading?: boolean }> = ({
  topic,
  isLoading,
}) => {
  const size: 'sm' | 'md' | 'xl' = useBreakpointValue({ base: 'sm', sm: 'md', md: 'xl' }) || 'xl';
  return (
    <Skeleton isLoaded={!isLoading}>
      <Wrap>
        {topic.parentTopic?.parentTopic && (
          <WrapItem>
            <TopicLink size={size} topic={topic.parentTopic.parentTopic} />
          </WrapItem>
        )}
        {topic.parentTopic?.parentTopic && (
          <WrapItem>
            <Text as="span" fontSize={size}>
              /
            </Text>
          </WrapItem>
        )}
        {topic.parentTopic && (
          <WrapItem>
            <TopicLink size={size} topic={topic.parentTopic} />
          </WrapItem>
        )}
      </Wrap>
    </Skeleton>
  );
};
