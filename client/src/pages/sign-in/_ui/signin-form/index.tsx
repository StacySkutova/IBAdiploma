import { ReactElement, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  authByBackend,
  selectIsSignInFormLoading,
  selectSignInFormError, setSignInFormError,
} from 'app/store/authReducer';
import AllRoutes from 'shared/config/routes';
import { WarningIconSVG, PasswordVisibilityEyeSVG, PasswordNonVisibilityEyeSVG } from 'shared/svgs';
import LanguageSelector from 'shared/components/language-selector';
import Loader from 'shared/components/loader';

import styles from './styles.module.scss';

export default function SignInForm(): ReactElement {
  const dispatch = useDispatch();

  const isSignInFormLoading = useSelector(selectIsSignInFormLoading);
  const signInFormError = useSelector(selectSignInFormError);

  const [isPasswordValueShown, setIsPasswordValueShown] = useState(false);

  const { t } = useTranslation();

  const validationsSchema = yup.object().shape({
    userName: yup.string().required(t('warning_required')),
    password: yup.string().required(t('warning_required')),
  });

  useEffect(() => {
    dispatch(setSignInFormError(null));
  }, []);

  return (
    <div className={styles.SignInForm__pageWrapper}>
      {isSignInFormLoading && <Loader />}
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={({ userName, password }): void => {
          dispatch(authByBackend({ userName, password }));
        }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className={styles.SignInForm__content}>
            <div className={styles.SignInForm__greatingPhrase}>
              {t('title_signIn')} <LanguageSelector />
            </div>
            <label htmlFor='user-name' className={styles.SignInForm__inputLabel}>
              {t('user_input_label')}
              <input
                className={styles.SignInForm__inputField}
                type='text'
                name='userName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
              />
            </label>
            {touched.userName && errors.userName && (
              <div className={styles.SignInForm__warningBlock}>
                <WarningIconSVG />
                <div className={styles.SignInForm__warningMessage}>{errors.userName}</div>
              </div>
            )}
            <label htmlFor='password' className={styles.SignInForm__inputLabel}>
              {t('password_input_label')}
              <div className={styles.SignInForm__passwordDataContainer}>
                <input
                  className={styles.SignInForm__inputField}
                  type={isPasswordValueShown ? 'text' : 'password'}
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className={styles.SignInForm__iconSHowHidePassword}>
                  <IconButton onClick={(): void => {
                    setIsPasswordValueShown(!isPasswordValueShown);
                  }}>
                    {isPasswordValueShown ? (
                      <PasswordNonVisibilityEyeSVG />
                    ) : (
                      <PasswordVisibilityEyeSVG />
                    )}
                  </IconButton>
                </div>
              </div>
            </label>
            {touched.password && errors.password && (
              <div className={styles.SignInForm__warningBlock}>
                <WarningIconSVG />
                <div className={styles.SignInForm__warningMessage}>{errors.password}</div>
              </div>
            )}
            <div className={styles.SignInForm__linkBlock}>
              <Link to={AllRoutes.FORGOT_PASSWORD} className={styles.SignInForm__linkForgotPassword}>
                {t('title_link_forgot_password')}
              </Link>
              <Link to={AllRoutes.SIGN_UP} className={styles.SignInForm__linkSigUp}>
                {t('link_button_registration')}
              </Link>
            </div>
            {signInFormError !== null && (
              <div className={styles.SignInForm__warningBlock}>
                <WarningIconSVG />
                <div className={styles.SignInForm__warningMessage}>
                  {signInFormError || t('general_signin_error')}
                </div>
              </div>
            )}
            <button
              className={styles.SignInForm__submitButton}
              name='generalValidation'
              onClick={() => handleSubmit()}
              disabled={!isValid || !dirty}
              type='submit'
            >
              {t('enter_button')}
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}
