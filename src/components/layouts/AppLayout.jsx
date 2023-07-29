import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'lib/useAuth';

import Sidebar from 'components/Sidebar';

const AppLayout = () => {
  const outlet = useOutlet();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className='flex'>
      <Sidebar />

      <div style={{ width: 'calc(100vw - 250px)'}}>
        {outlet}
      </div>
    </div>
  );
};

export default AppLayout;
