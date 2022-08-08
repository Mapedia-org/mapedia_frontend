import { useRouter } from 'next/router';

import { CurrentUserProfilePage } from '../../src/pages/profile/CurrentUserProfilePage';
import { UserProfilePage } from '../../src/pages/profile/UserProfilePage';
import { useCurrentUser } from '../../src/graphql/users/users.hooks';
import { NextPage } from 'next';

const ProfilePage: NextPage<{}> = () => {
  const router = useRouter();

  const { key } = router.query;

  const { currentUser } = useCurrentUser();

  if (typeof key !== 'string') return null;

  if (currentUser && currentUser.key === key) {
    return <CurrentUserProfilePage currentUser={currentUser} />;
  }
  return <UserProfilePage userKey={key} />;
};

export default ProfilePage;
