import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div id='main-content'>
      <Outlet />
    </div>
  )
}

export default App;
