import * as Types from '../types';

import { LearningPathWithResourceItemsPreviewDataFragment } from './learning_paths.fragments.generated';
import * as Operations from './learning_paths.operations';
import * as Apollo from '@apollo/client';
export type UpdateLearningPathMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
  payload: Types.UpdateLearningPathPayload;
}>;


export type UpdateLearningPathMutation = (
  { __typename?: 'Mutation' }
  & { updateLearningPath: (
    { __typename?: 'LearningPath' }
    & LearningPathWithResourceItemsPreviewDataFragment
  ) }
);

export type DeleteLearningPathMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteLearningPathMutation = (
  { __typename?: 'Mutation' }
  & { deleteLearningPath: (
    { __typename?: 'DeleteLearningPathResult' }
    & Pick<Types.DeleteLearningPathResult, '_id' | 'success'>
  ) }
);


export type UpdateLearningPathMutationFn = Apollo.MutationFunction<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>;

/**
 * __useUpdateLearningPathMutation__
 *
 * To run a mutation, you first call `useUpdateLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLearningPathMutation, { data, loading, error }] = useUpdateLearningPathMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>) {
        return Apollo.useMutation<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>(Operations.updateLearningPath, baseOptions);
      }
export type UpdateLearningPathMutationHookResult = ReturnType<typeof useUpdateLearningPathMutation>;
export type UpdateLearningPathMutationResult = Apollo.MutationResult<UpdateLearningPathMutation>;
export type UpdateLearningPathMutationOptions = Apollo.BaseMutationOptions<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>;
export type DeleteLearningPathMutationFn = Apollo.MutationFunction<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>;

/**
 * __useDeleteLearningPathMutation__
 *
 * To run a mutation, you first call `useDeleteLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLearningPathMutation, { data, loading, error }] = useDeleteLearningPathMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>) {
        return Apollo.useMutation<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>(Operations.deleteLearningPath, baseOptions);
      }
export type DeleteLearningPathMutationHookResult = ReturnType<typeof useDeleteLearningPathMutation>;
export type DeleteLearningPathMutationResult = Apollo.MutationResult<DeleteLearningPathMutation>;
export type DeleteLearningPathMutationOptions = Apollo.BaseMutationOptions<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>;