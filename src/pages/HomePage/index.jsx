import { Button } from 'components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login', { replace: true });
  }

  return (
    <div>
      <h1 className='text-3xl font-bold'>
        Welcome to the Library Management Application!
      </h1>
      <p>Click login to continue!</p>
      <Button onClick={goToLogin}>Login</Button>
    </div>
  )
}

export default HomePage;
