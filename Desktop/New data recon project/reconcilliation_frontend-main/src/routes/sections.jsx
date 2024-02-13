import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Spinner from 'src/utils/spinner/Spinner';

import DashboardLayout from 'src/layouts/dashboard';
import UserProfile from 'src/providers/user-provider';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const Register = lazy(() => import('src/pages/auth/register'));
export const ForgotPassword = lazy(() => import('src/pages/auth/forgot-password'));
export const OTP = lazy(() => import('src/pages/auth/verify-otp'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


const PrivateRoute = ({ element, ...rest }) => {
  const { is_authenticated } = UserProfile;

  return is_authenticated() ? (
    <Suspense fallback={<Spinner />}>
      {element}
    </Suspense>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Prop types validation for PrivateRoute component
PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'MOBILE', element: <PrivateRoute element={<UserPage />} /> },
        { path: 'cards', element: <PrivateRoute element={<ProductsPage />} /> },
        { path: 'blog', element: <PrivateRoute element={<BlogPage />} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: 'verify-otp',
      element: <OTP />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
