import gql from 'graphql-tag';
import { ConceptData } from '../concepts/concepts.fragments';

// Define fragment based on components use cases

export const ResourceData = gql`
  fragment ResourceData on Resource {
    _id
    name
    type
    mediaType
    url
    description
    durationMn
    tags {
      name
    }
    consumed {
      openedAt
      consumedAt
    }
  }
`;

export const ResourcePreviewData = gql`
  fragment ResourcePreviewData on Resource {
    _id
    name
    type
    mediaType
    url
    description
    durationMn
    tags {
      name
    }
    consumed {
      openedAt
      consumedAt
    }
    coveredConcepts(options: {}) {
      items {
        ...ConceptData
      }
    }
    upvotes
  }
  ${ConceptData}
`;
