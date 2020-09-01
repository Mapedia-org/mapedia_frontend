import * as Types from '../../../graphql/types';

import { ConceptWithDependenciesDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import * as Operations from './ConceptListPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type ListConceptsConceptListPageQueryVariables = Exact<{
  domainKey: Types.Scalars['String'];
  options: Types.DomainConceptsOptions;
}>;


export type ListConceptsConceptListPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key' | 'name'>
    & { concepts?: Types.Maybe<(
      { __typename?: 'DomainConceptsResults' }
      & { items: Array<(
        { __typename?: 'DomainConceptsItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & ConceptWithDependenciesDataFragment
        ), relationship: (
          { __typename?: 'ConceptBelongsToDomain' }
          & Pick<Types.ConceptBelongsToDomain, 'index'>
        ) }
      )> }
    )> }
  ) }
);



/**
 * __useListConceptsConceptListPageQuery__
 *
 * To run a query within a React component, call `useListConceptsConceptListPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useListConceptsConceptListPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListConceptsConceptListPageQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useListConceptsConceptListPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListConceptsConceptListPageQuery, ListConceptsConceptListPageQueryVariables>) {
        return ApolloReactHooks.useQuery<ListConceptsConceptListPageQuery, ListConceptsConceptListPageQueryVariables>(Operations.listConceptsConceptListPage, baseOptions);
      }
export function useListConceptsConceptListPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListConceptsConceptListPageQuery, ListConceptsConceptListPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListConceptsConceptListPageQuery, ListConceptsConceptListPageQueryVariables>(Operations.listConceptsConceptListPage, baseOptions);
        }
export type ListConceptsConceptListPageQueryHookResult = ReturnType<typeof useListConceptsConceptListPageQuery>;
export type ListConceptsConceptListPageLazyQueryHookResult = ReturnType<typeof useListConceptsConceptListPageLazyQuery>;
export type ListConceptsConceptListPageQueryResult = ApolloReactCommon.QueryResult<ListConceptsConceptListPageQuery, ListConceptsConceptListPageQueryVariables>;