import { lazy, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAuthUserInfo, selectIsAuthenticated } from 'app/store/authReducer';
import AllRoutes from 'shared/config/routes';
import AuthRoute from './_ui/AuthRoute/index';

const SignIn = lazy(() => import('pages/sign-in'));
const SignUp = lazy(() => import('pages/sign-up'));
const ForgotPassword = lazy(() => import('pages/forgot-password'));
const ResetPassword = lazy(() => import('pages/reset-password'));
const UserProfilePage = lazy(() => import('pages/user-profile'));
const AdminPanelPage = lazy(() => import('pages/admin-panel'));
const NotFound = lazy(() => import('pages/404'));

function Pages(): ReactElement {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authUserInfo = useSelector(selectAuthUserInfo);

  return (
    <Routes>
      <Route
        path={AllRoutes.USER_PROFILE}
        element={
          <AuthRoute>
            <UserProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path={AllRoutes.ADMIN_PANEL}
        element={
          <AuthRoute>
            <AdminPanelPage />
          </AuthRoute>
        }
      />
      <Route
        path={AllRoutes.NOT_FOUND}
        element={
          <AuthRoute>
            <Route path="*" element={<Navigate to={AllRoutes.NOT_FOUND} replace />} />
            <Route path={AllRoutes.NOT_FOUND} element={<NotFound />} />
          </AuthRoute>
        }
      />
      <Route path={AllRoutes.HOME} element={<Navigate to={AllRoutes.SIGN_IN} />} />
      <Route path={AllRoutes.SIGN_UP} element={<SignUp />} />
      <Route path={AllRoutes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={AllRoutes.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
      {/* eslint-disable-next-line no-nested-ternary */}
      {isAuthenticated && authUserInfo.role !== 'admin' ? (
        <Route
          path={AllRoutes.SIGN_IN}
          element={<Navigate to={AllRoutes.USER_PROFILE_HOMEPAGE} replace />}
        />
      ) : isAuthenticated && authUserInfo.role === 'admin' ? (
        <Route path={AllRoutes.SIGN_IN} element={<Navigate to="/admin-panel" replace />} />
      ) : (
        <Route path={AllRoutes.SIGN_IN} element={<SignIn />} />
      )}
    </Routes>
  );
}

export default Pages;
