import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';

import App from 'App';
import LoginPage from 'pages/LoginPage';
import DashboardPage from 'pages/DashboardPage';
import ErrorPage from 'pages/ErrorPage';

import 'styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
