import * as Types from '../../graphql/types';

import { ResourcePreviewCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import * as Operations from './BestXPage';
import * as Apollo from '@apollo/client';
export type GetBestXPageDataQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.TopicLearningMaterialsOptions;
}>;


export type GetBestXPageDataQuery = (
  { __typename?: 'Query' }
  & { getTopicByKey: (
    { __typename?: 'Topic' }
    & Pick<Types.Topic, '_id' | 'key' | 'name' | 'description'>
    & { learningMaterials?: Types.Maybe<(
      { __typename?: 'TopicLearningMaterialsResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewCardDataFragment
      ) | (
        { __typename?: 'LearningPath' }
        & LearningPathPreviewCardDataFragment
      )> }
    )> }
  ) }
);



/**
 * __useGetBestXPageDataQuery__
 *
 * To run a query within a React component, call `useGetBestXPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBestXPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBestXPageDataQuery({
 *   variables: {
 *      key: // value for 'key'
 *      learningMaterialsOptions: // value for 'learningMaterialsOptions'
 *   },
 * });
 */
export function useGetBestXPageDataQuery(baseOptions: Apollo.QueryHookOptions<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>) {
        return Apollo.useQuery<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>(Operations.getBestXPageData, baseOptions);
      }
export function useGetBestXPageDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>) {
          return Apollo.useLazyQuery<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>(Operations.getBestXPageData, baseOptions);
        }
export type GetBestXPageDataQueryHookResult = ReturnType<typeof useGetBestXPageDataQuery>;
export type GetBestXPageDataLazyQueryHookResult = ReturnType<typeof useGetBestXPageDataLazyQuery>;
export type GetBestXPageDataQueryResult = Apollo.QueryResult<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>;