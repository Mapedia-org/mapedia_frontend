import * as Types from '../../graphql/types';

export type ConceptGroupLearningGoalDataFragment = { __typename?: 'LearningGoal', _id: string, key: string, name: string, hidden: boolean, type: Types.LearningGoalType, description?: string | null | undefined, publishedAt?: any | null | undefined, createdBy?: { __typename?: 'User', _id: string } | null | undefined, startedBy?: { __typename?: 'LearningGoalStartedByResults', count: number, items: Array<{ __typename?: 'LearningGoalStartedByItem', user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> } | null | undefined, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', subGoal: { __typename?: 'LearningGoal', type: Types.LearningGoalType, _id: string, key: string, name: string } | { __typename?: 'Topic' } }> | null | undefined, started?: { __typename?: 'LearningGoalStarted', startedAt: any } | null | undefined, requiredInGoals?: Array<{ __typename?: 'RequiredInGoalItem', strength: number, goal: { __typename?: 'LearningGoal', _id: string, key: string, name: string, type: Types.LearningGoalType } }> | null | undefined, relevantLearningMaterials?: { __typename?: 'LearningGoalRelevantLearningMaterialsResults', items: Array<{ __typename?: 'LearningGoalRelevantLearningMaterialsItem', coverage?: number | null | undefined, learningMaterial: { __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } | { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, recommendationsCount?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined } }> } | null | undefined };
