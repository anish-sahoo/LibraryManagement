import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'lib/useAuth';

const AppLayout = () => {
  const outlet = useOutlet();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return outlet;
};

export default AppLayout;
