import { Link, Button, LinkProps, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { PageInfo } from '../../pages/PageInfo';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';

export type InternalLinkProps = { asHref: string; routePath: string; isDisabled?: boolean } & LinkProps;

export const InternalLink: React.FC<InternalLinkProps> = ({
  asHref,
  routePath,
  isDisabled,
  children,
  ...linkProps
}) => {
  return (
    <NextLink href={routePath} as={asHref} passHref>
      <Link {...linkProps}>{children}</Link>
    </NextLink>
  );
};

export const PageLink: React.FC<{ pageInfo: PageInfo; isDisabled?: boolean } & LinkProps> = ({
  pageInfo,
  ...props
}) => {
  return <InternalLink routePath={pageInfo.routePath} asHref={pageInfo.path} {...props} />;
};

export const InternalButtonLink: React.FC<
  { routePath: string; asHref: string; loggedInOnly?: boolean } & ButtonProps
> = ({ routePath, asHref, children, loggedInOnly, ...buttonProps }) => {
  const { currentUser } = useCurrentUser();
  const { onOpen } = useUnauthentificatedModal();
  return (
    <NextLink href={routePath} as={asHref} passHref>
      <Button
        {...buttonProps}
        onClick={(e) => {
          if (loggedInOnly && !currentUser) {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {children}
      </Button>
    </NextLink>
  );
};
