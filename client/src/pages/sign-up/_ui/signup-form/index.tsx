import { ReactElement, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  regByBackend, selectIsSignUpFormLoading, selectIsSignUpSuccess,
  selectSignUpFormError, setIsSignUpSuccess, setSignUpFormError,
} from 'app/store/authReducer';
import AllRoutes from 'shared/config/routes';
import {
  WarningIconSVG, PasswordVisibilityEyeSVG, PasswordNonVisibilityEyeSVG,
  CheckedIconSVG,
} from 'shared/svgs';
import LanguageSelector from 'shared/components/language-selector';
import Loader from 'shared/components/loader';

import styles from './styles.module.scss';

export default function SignUpForm(): ReactElement {
  const dispatch = useDispatch();

  const isSignUpFormLoading = useSelector(selectIsSignUpFormLoading);
  const isSignUpSuccess = useSelector(selectIsSignUpSuccess);
  const signUpFormError = useSelector(selectSignUpFormError);

  const [isPasswordValueShown, setIsPasswordValueShown] = useState(false);
  const [isConfirmPasswordValueShown, setIsConfirmPasswordValueShown] = useState(false);

  const { t } = useTranslation();

  const validationsSchema = yup.object().shape({
    userName: yup.string().required(t('warning_required')),
    email: yup.string().email(t('warning_correct_mail')).required(t('warning_required')),
    password: yup.string().required(t('warning_required')),
    confirmPassword: yup.string().required(t('warning_required')),
  });

  useEffect(() => {
    dispatch(setIsSignUpSuccess(false));
    dispatch(setSignUpFormError(null));
  }, []);

  return (
    <div className={styles.SignUpForm__pageWrapper}>
      {isSignUpFormLoading && <Loader />}
      <div className={styles.SignUpForm__content}>
        <div className={styles.SignUpForm__greatingPhrase}>{t('title_signOut')}
          <LanguageSelector />
        </div>
        {isSignUpSuccess && (
          <div className={styles.SignUpForm__infoBlock}>
            <CheckedIconSVG />
            <div className={styles.SignUpForm__infoMessage}>
              <div>Your are registered now, please go back to signin page</div>
            </div>
          </div>
        )}
        {!isSignUpSuccess && (
          <Formik
            initialValues={{
              userName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validateOnBlur
            onSubmit={({ userName, email, password, confirmPassword }): void => {
              dispatch(regByBackend({ userName, email, password, confirmPassword }));
            }}
            validationSchema={validationsSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (<>
                <label htmlFor='user-name' className={styles.SignUpForm__inputLabel}>
                  {t('user_input_label')}
                  <input
                    className={styles.SignUpForm__inputField}
                    type='text'
                    name='userName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                  />
                </label>
                {touched.userName && errors.userName && (
                  <div className={styles.SignUpForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.SignUpForm__warningMessage}>{errors.userName}</div>
                  </div>
                )}
                <label htmlFor='email' className={styles.SignUpForm__inputLabel}>
                  {t('email_input_label')}
                  <input
                    className={styles.SignUpForm__inputField}
                    type='text'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </label>
                {touched.email && errors.email && (
                  <div className={styles.SignUpForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.SignUpForm__warningMessage}>{errors.email}</div>
                  </div>
                )}
                <label htmlFor='password' className={styles.SignUpForm__inputLabel}>
                  {t('new_password_input_label')}
                  <div className={styles.SignUpForm__passwordDataContainer}>
                    <input
                      className={styles.SignUpForm__inputField}
                      type={isPasswordValueShown ? 'text' : 'password'}
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <div className={styles.SignUpForm__iconSHowHidePassword}>
                      <IconButton onClick={() => setIsPasswordValueShown(!isPasswordValueShown)}>
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
                  <div className={styles.SignUpForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.SignUpForm__warningMessage}>{errors.password}</div>
                  </div>
                )}
                <label htmlFor='confirm-password' className={styles.SignUpForm__inputLabel}>
                  {t('confirm_password_input_label')}
                  <div className={styles.SignUpForm__passwordDataContainer}>
                    <input
                      className={styles.SignUpForm__inputField}
                      type={isConfirmPasswordValueShown ? 'text' : 'password'}
                      name='confirmPassword'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <div className={styles.SignUpForm__iconSHowHidePassword}>
                      <IconButton
                        onClick={() => setIsConfirmPasswordValueShown(!isConfirmPasswordValueShown)}
                      >
                        {isConfirmPasswordValueShown ? (
                          <PasswordNonVisibilityEyeSVG />
                        ) : (
                          <PasswordVisibilityEyeSVG />
                        )}
                      </IconButton>
                    </div>
                  </div>
                </label>
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className={styles.SignUpForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.SignUpForm__warningMessage}>
                      {errors.confirmPassword}
                    </div>
                  </div>
                )}
                {signUpFormError && (
                  <div className={styles.SignUpForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.SignUpForm__warningMessage}>
                      {signUpFormError || 'Пароли не совпадают'}
                    </div>
                  </div>
                )}
                <button
                  className={styles.SignUpForm__submitButton}
                  name='generalValidation'
                  onClick={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                  type='submit'
                >
                  {t('link_button_registration')}
                </button>
              </>
            )}
          </Formik>
        )}
        <Link to={AllRoutes.SIGN_IN} className={styles.SignUpForm__linkBackToSignIn}>
          {t('link_back')}
        </Link>
      </div>
    </div>
  );
}
