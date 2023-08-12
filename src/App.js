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
import StudentsPage from 'pages/StudentsPage';
import AuthorsPage from 'pages/AuthorsPage';
import ReportsPage from 'pages/ReportsPage';
import UsersPage from 'pages/UsersPage';

import AuthLayout from 'components/layouts/AuthLayout';
import HomeLayout from 'components/layouts/HomeLayout';
import AppLayout from 'components/layouts/AppLayout';

import { setAuthHeaders } from 'apis/axios';
import { authUser } from 'apis/auth';

// ideally this would be an API call to server to get logged in user data
const getUserData = () =>
  new Promise(async (resolve) => {
    await setAuthHeaders();

    try {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        const response = await authUser();
        resolve(response.data);
      } else {
        resolve(null);
      }
    } catch (error) {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      resolve(null);
    }
  });

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
        <Route path='/students' element={<StudentsPage />} />
        <Route path='/authors' element={<AuthorsPage />} />
        <Route path='/reports' element={<ReportsPage />} />
        <Route path='/users' element={<UsersPage />} />
      </Route>
    </Route>
  )
);
