import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NowPlaying from './pages/NowPlayingPage';
import PopularPage from './pages/PopularPage';
import ErrorPage from './pages/ErrorPage';
import DetailsPage from './pages/DetailsPage';
import ProfilePage from './pages/ProfilePage';

import 'animate.css';
import LoginPage from './pages/LoginPage';
import UpComingPage from './pages/UpcomingPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmail';
import PrivateRoute from './navigations/PrivateRoute';
import DashboardAdmin from './pages/DashboardAdmin';
import UserWatchlist from './pages/UserWatchlist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/now-playing',
    element: <NowPlaying />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/popular',
    element: <PopularPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/upcoming',
    element: <UpComingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/details/:id',
    element: <DetailsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/admin',
    element: (
      <PrivateRoute path="/">
        <DashboardAdmin />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin/users-watchlist',
    element: (
      <PrivateRoute path="/">
        <UserWatchlist />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
