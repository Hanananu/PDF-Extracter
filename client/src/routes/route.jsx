import React, { lazy, Suspense } from 'react';
import { BlobProvider } from '../context/BlobContext';
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Loader from '../components/Loader';


const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const ViewPdf = lazy(() => import('../pages/ViewPdf'));
const ExtractedPdf = lazy(() => import('../pages/ExtractedPdf'));

const clientRoutes = {
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loader loading={true} />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: 'view-pdf/:fileName',
      element: (
        <Suspense fallback={<Loader loading={true}/>}>
          <BlobProvider>
            <ViewPdf />
          </BlobProvider>
        </Suspense>
      ),
    },
    {
      path: 'extracted-pdf',
      element: (
        <Suspense fallback={<Loader loading={true} />}>
          <BlobProvider>
            <ExtractedPdf />
          </BlobProvider>
        </Suspense>
      ),
    },
    {
      path: 'userprofile/:username',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile />
        </Suspense>
      ),
    },
  ],
};

const clientLogin = {
  path: '/login',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  ),
};

const clientRegister = {
  path: '/register',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPage />
    </Suspense>
  ),
};

export { clientRoutes, clientLogin, clientRegister };
