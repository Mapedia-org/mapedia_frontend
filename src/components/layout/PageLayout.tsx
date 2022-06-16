import { Box, BoxProps, Flex, FlexProps, Heading, Skeleton, Text, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { RoleAccessAllowedRule, userHasAccess } from '../auth/RoleAccess';
import { NavigationBreadcrumbs, NavigationBreadcrumbsProps } from './NavigationBreadcrumbs';

export const pageLayoutMarginSizesMapping: { [key in 'sm' | 'md' | 'lg' | 'xl' | '2xl']: { px: FlexProps['px'] } } = {
  sm: {
    px: { base: '4px', sm: '1%', md: '3%' },
  },
  md: {
    px: { base: '4px', sm: '2%', md: '5%' },
  },
  lg: {
    px: { base: '4px', sm: '3%', md: '8%' },
  },
  xl: {
    px: { base: '4px', sm: '5%', md: '16%' },
  },
  '2xl': {
    px: { base: '4px', sm: '7%', md: '25%' },
  },
};

interface PageLayoutProps {
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  breadCrumbsLinks?: NavigationBreadcrumbsProps['links'];
  title?: string;
  renderTopRight?: ReactNode;
  renderTopLeft?: ReactNode;
  centerChildren?: boolean;
  isLoading?: boolean;
  accessRule?: RoleAccessAllowedRule | boolean;
  marginSize?: keyof typeof pageLayoutMarginSizesMapping;
  renderBackgroundImage?: ReactNode;
}
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  breadCrumbsLinks,
  title,
  renderTopLeft,
  renderTopRight,
  renderLeft,
  renderRight,
  centerChildren,
  isLoading,
  accessRule,
  marginSize = 'md',
  renderBackgroundImage,
  ...baseLayoutProps
}) => {
  return (
    <BasePageLayout
      renderLeft={renderLeft}
      renderRight={renderRight}
      centerChildren={centerChildren}
      accessRule={accessRule}
      marginSize={marginSize}
      renderBackgroundImage={renderBackgroundImage}
      renderHeader={(layoutProps) => (
        <BasicPageHeader
          breadCrumbsLinks={breadCrumbsLinks}
          title={title}
          renderTopLeft={renderTopLeft}
          renderTopRight={renderTopRight}
          layoutProps={layoutProps}
          isLoading={isLoading}
        />
      )}
    >
      {children}
    </BasePageLayout>
  );
};

interface BasePageLayout {
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  renderHeader?: (layoutProps: BoxProps) => ReactNode;
  centerChildren?: boolean;
  accessRule?: RoleAccessAllowedRule | boolean;
  marginSize?: keyof typeof pageLayoutMarginSizesMapping;
  renderBackgroundImage?: ReactNode;
}
export const BasePageLayout: React.FC<BasePageLayout> = ({
  renderLeft,
  renderRight,
  renderHeader,
  centerChildren,
  accessRule,
  marginSize = 'md',
  renderBackgroundImage,
  children,
}) => {
  const { currentUser } = useCurrentUser();
  if ((typeof accessRule === 'string' && !userHasAccess(accessRule, currentUser)) || accessRule === false)
    return (
      <Flex width="100%" alignItems="center" justifyContent="center">
        <Text fontSize="3xl" textAlign="center" mt="200px">
          Forbidden
        </Text>
      </Flex>
    );
  return (
    <Flex justifyContent="center" id="here">
      <Flex
        direction="column"
        alignItems="stretch"
        pb="100px"
        width="100%"
        maxWidth={{ base: '100%', md: '2200px' }}
        position="relative"
      >
        {renderBackgroundImage}
        {renderHeader && renderHeader(pageLayoutMarginSizesMapping[marginSize])}
        <Flex
          direction="row"
          justifyContent="stretch"
          minH="100%"
          px={pageLayoutMarginSizesMapping[marginSize].px}
          flexGrow={1}
        >
          {renderLeft && <Box>{renderLeft}</Box>}
          <Box flexGrow={1} {...(centerChildren && { display: 'flex', flexDirection: 'column', alignItems: 'center' })}>
            {children}
          </Box>
          {renderRight && <Box>{renderRight}</Box>}
        </Flex>
      </Flex>
    </Flex>
  );
};

interface BasicPageHeaderProps {
  breadCrumbsLinks?: NavigationBreadcrumbsProps['links'];
  title?: string;
  renderTopRight?: ReactNode;
  renderTopLeft?: ReactNode;

  isLoading?: boolean;
  layoutProps?: BoxProps;
}

const BasicPageHeader: React.FC<BasicPageHeaderProps> = ({
  breadCrumbsLinks,
  title,
  renderTopRight,
  renderTopLeft,
  isLoading,
}) => {
  const breadcrumbSize: 'sm' | 'md' = useBreakpointValue({ base: 'sm', md: 'md' }) || 'md';
  return (
    <Flex direction="column" alignItems="stretch" pt="16px">
      {(breadCrumbsLinks || renderTopRight || renderTopLeft) && (
        <Flex direction="row" justifyContent="space-between" pb="8px" pl={6} pr={6}>
          <Flex direction="column">
            {!!breadCrumbsLinks && !!breadCrumbsLinks.length && (
              <Skeleton isLoaded={!isLoading}>
                <NavigationBreadcrumbs links={breadCrumbsLinks} size={breadcrumbSize} />
              </Skeleton>
            )}
            {renderTopLeft}
          </Flex>
          <Box pr={6}>{renderTopRight}</Box>
        </Flex>
      )}
      {title && (
        <Flex justifyContent="center" pb="20px">
          <Skeleton isLoaded={!isLoading}>
            <Heading textAlign="center" fontSize="4xl" fontWeight="light">
              {title}
            </Heading>
          </Skeleton>
        </Flex>
      )}
    </Flex>
  );
};
