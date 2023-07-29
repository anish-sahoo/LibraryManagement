import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from 'react-router-dom';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import DashboardPage from 'pages/DashboardPage';
import BooksPage from 'pages/BooksPage';
import SettingsPage from 'pages/SettingsPage';

import AuthLayout from 'components/layouts/AuthLayout';
import HomeLayout from 'components/layouts/HomeLayout';
import AppLayout from 'components/layouts/AppLayout';

// ideally this would be an API call to server to get logged in user data
const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user');
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/books' element={<BooksPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Route>
    </Route>
  )
);
