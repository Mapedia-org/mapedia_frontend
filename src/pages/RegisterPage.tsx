import { Box, Center, Divider, Link, Stack, Text } from '@chakra-ui/react';
import Router from 'next/router';
import { RegisterForm } from '../components/auth/RegisterForm';
import { RoleAccess } from '../components/auth/RoleAccess';
import { PageLayout } from '../components/layout/PageLayout';
import { PageLink } from '../components/navigation/InternalLink';
import { LoginPageInfo } from './RoutesPageInfos';

export const RegisterPage: React.FC = () => {
  return (
    <RoleAccess accessRule="notLoggedInUser" redirectTo="/">
      <PageLayout marginSize="xl" title="Register">
        <Stack maxW="36rem" margin="auto">
          <RegisterForm onSuccess={() => Router.push(`/`)} />
          <Divider my={4}></Divider>
          <Box textAlign="center">
            <Text fontSize="lg" fontWeight={500}>
              Already have an account ?{' '}
              <PageLink color="blue.500" fontWeight={600} pageInfo={LoginPageInfo}>
                Login
              </PageLink>
            </Text>
          </Box>
        </Stack>
      </PageLayout>
    </RoleAccess>
  );
};
