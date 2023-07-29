import { useNavigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'lib/useAuth';

const AppLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return navigate('/login', { replace: true });
  }

  return outlet;
};

export default AppLayout;
