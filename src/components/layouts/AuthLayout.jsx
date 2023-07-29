import React, { Suspense } from 'react';
import { useLoaderData, useOutlet, Await } from 'react-router-dom';

import Loader from  'components/Loader';
import { AuthProvider } from 'lib/useAuth';

const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<Loader size='md' />}>
      <Await
        resolve={userPromise}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};

export default AuthLayout;
