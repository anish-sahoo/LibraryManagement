import React, { Suspense } from 'react';
import { useLoaderData, useOutlet, Await } from 'react-router-dom';
import { Toaster } from 'components/ui/toaster';

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
          <AuthProvider userData={user}>
            <Toaster />
            {outlet}
          </AuthProvider>
        )}
      />
    </Suspense>
  );
};

export default AuthLayout;
