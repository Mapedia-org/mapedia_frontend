import gql from "graphql-tag";
import { LearningPathData } from "./learning_paths.fragments";

export const updateLearningPath = gql`
  mutation updateLearningPath($_id: String!, $payload: UpdateLearningPathPayload!) {
    updateLearningPath(_id: $_id, payload: $payload) {
      ...LearningPathData
    }
  }
  ${LearningPathData}
`;

export const deleteLearningPath = gql`
    mutation deleteLearningPath($_id: String!) {
        deleteLearningPath(_id: $_id) {
            _id
            success
        }
    }
`;
