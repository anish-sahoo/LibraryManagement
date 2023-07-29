import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'lib/useAuth';

const HomeLayout = () => {
  const outlet = useOutlet();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return outlet;
};

export default HomeLayout;
