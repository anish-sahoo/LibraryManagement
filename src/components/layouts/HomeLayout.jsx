import { useNavigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'lib/useAuth';

const HomeLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return navigate('/dashboard', { replace: true });
  }

  return outlet;
};

export default HomeLayout;
