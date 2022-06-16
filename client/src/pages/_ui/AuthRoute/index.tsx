import { ReactElement, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Routes from 'shared/config/routes';
import { selectIsAuthenticated, selectAuthUserInfo } from 'app/store/authReducer';

function AuthRoute({ children }): ReactElement {
  const navigate = useNavigate();
  const { state }: any = useLocation();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authUserInfo = useSelector(selectAuthUserInfo);

  useEffect(() => {
    if (!isAuthenticated || !authUserInfo.userName) {
      const redirectTo = state?.from || Routes.HOME;
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, state?.from, authUserInfo?.userName]);
  return children;
}

export default AuthRoute;
