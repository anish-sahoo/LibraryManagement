import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'lib/useAuth';

import Sidebar from 'components/Sidebar';
import { registerIntercepts } from 'apis/axios';

const AppLayout = () => {
  const outlet = useOutlet();
  const { user, logout } = useAuth();

  if (user) {
    registerIntercepts(logout);

    return (
      <div className='flex'>
        <Sidebar />

        <div style={{ width: 'calc(100vw - 230px)' }}>
          {outlet}
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default AppLayout;
