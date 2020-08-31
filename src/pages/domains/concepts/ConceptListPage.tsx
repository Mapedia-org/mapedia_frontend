import { Box, Flex, Stack } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { ConceptList } from '../../../components/concepts/ConceptList';
import { VerticalConceptMappingVisualisation } from '../../../components/concepts/ConceptMappingVisualisation';
import { PageLayout } from '../../../components/layout/PageLayout';
import { InternalButtonLink } from '../../../components/navigation/InternalLink';
import { ConceptWithDependenciesData } from '../../../graphql/concepts/concepts.fragments';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { DomainConceptSortingEntities, DomainConceptSortingFields, SortingDirection } from '../../../graphql/types';
import { PageInfo } from '../../PageInfo';
import { DomainPageInfo } from '../DomainPage';
import { useListConceptsConceptListPageQuery } from './ConceptListPage.generated';

export const ConceptListPagePath = (domainKey: string) => `/domains/${domainKey}/concepts`;

export const ConceptListPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Concepts',
  path: ConceptListPagePath(domain.key),
  routePath: ConceptListPagePath('[key]'),
});

export const listConceptsConceptListPage = gql`
  query listConceptsConceptListPage($domainKey: String!, $options: DomainConceptsOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      key
      name
      concepts(options: $options) {
        items {
          concept {
            ...ConceptWithDependenciesData
          }
          relationship {
            index
          }
        }
      }
    }
  }
  ${ConceptWithDependenciesData}
`;

export const ConceptListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading, refetch } = useListConceptsConceptListPageQuery({
    variables: {
      domainKey,
      options: {
        sorting: {
          field: DomainConceptSortingFields.Index,
          entity: DomainConceptSortingEntities.Relationship,
          direction: SortingDirection.Asc,
        },
      },
    },
  });

  if (!data) return <Box>Domain not found !</Box>;
  const domain = data.getDomainByKey;
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
      title={domain.name + ' - Concepts'}
      centerChildren
    >
      <Flex direction="row" mt={4}>
        <Stack spacing={4} width="36rem">
          <Box>
            <ConceptList
              domain={domain}
              domainConceptItems={domain.concepts?.items || []}
              onUpdateConceptIndex={() => refetch()}
            />
          </Box>
          <RoleAccess accessRule="admin">
            <InternalButtonLink
              variant="outline"
              routePath="/domains/[key]/concepts/new"
              asHref={`/domains/${domain.key}/concepts/new`}
            >
              + Add concept
            </InternalButtonLink>
          </RoleAccess>
        </Stack>
        <Box width="20px"></Box>
        <VerticalConceptMappingVisualisation
          concepts={domain.concepts?.items.map((i) => i.concept) || []}
          width="36rem"
        />
      </Flex>
    </PageLayout>
  );
};

export default ConceptListPage;
