import { ReactElement, useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  resetPasswordByBackend,
  selectIsResetPasswordFormLoading,
  selectIsResetPasswordSuccess,
  setIsResetPasswordSuccess, setResetPasswordFormError,
} from 'app/store/authReducer';
import AllRoutes from 'shared/config/routes';
import {
  WarningIconSVG,
  PasswordVisibilityEyeSVG,
  PasswordNonVisibilityEyeSVG,
  CheckedIconSVG,
} from 'shared/svgs';
import Loader from 'shared/components/loader';
import LanguageSelector from 'shared/components/language-selector';

import styles from './styles.module.scss';

export default function ResetPasswordForm(): ReactElement {
  const dispatch = useDispatch();

  const isResetPasswordFormLoading = useSelector(selectIsResetPasswordFormLoading);
  const isResetPasswordSuccess = useSelector(selectIsResetPasswordSuccess);

  const { t } = useTranslation();

  const [isNewPasswordValueShown, setIsNewPasswordValueShown] = useState(false);
  const [isConfirmPasswordValueShown, setIsConfirmPasswordValueShown] = useState(false);

  const validationsSchema = yup.object().shape({
    email: yup.string().email(t('warning_incorrectness')).required(t('warning_required')),
    newPassword: yup
      .string()
      .min(6, t('warning_password length'))
      .required(t('warning_required')),
    confirmPassword: yup
      .string()
      .min(6, t('warning_password length'))
      .required(t('warning_required')),
  });

  useEffect(() => {
    dispatch(setIsResetPasswordSuccess(false));
    dispatch(setResetPasswordFormError(null));
  }, []);

  return (
    <div className={styles.ResetPasswordForm__pageWrapper}>
      {isResetPasswordFormLoading && <Loader />}
      <div className={styles.ResetPasswordForm__content}>
        <div className={styles.ResetPasswordForm__greatingPhrase}>{t('title_button_reset_password')}
          <LanguageSelector /></div>
        {isResetPasswordSuccess && (
          <div className={styles.ResetPasswordForm__infoBlock}>
            <CheckedIconSVG />
            <div className={styles.ResetPasswordForm__infoMessage}>
              <div>{t('message_reset_password_success')}</div>
            </div>
          </div>
        )}
        {!isResetPasswordSuccess && (
          <Formik
            initialValues={{
              newPassword: '',
              confirmPassword: '',
              email: '',
            }}
            validateOnBlur
            onSubmit={({ email, newPassword, confirmPassword }): void => {
              dispatch(resetPasswordByBackend({ email, newPassword, confirmPassword }));
            }}
            validationSchema={validationsSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty,
            }) => (
              <>
                <label htmlFor='email' className={styles.ResetPasswordForm__inputLabel}>
                  {t('email_input_label')}
                  <input
                    className={styles.ResetPasswordForm__inputField}
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </label>
                {touched.email && errors.email && (
                  <div className={styles.ResetPasswordForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.ResetPasswordForm__warningMessage}>{errors.email}</div>
                  </div>
                )}
                <label htmlFor='newPassword' className={styles.ResetPasswordForm__inputLabel}>
                  {t('new_password_input_label')}
                  <div className={styles.ResetPasswordForm__passwordDataContainer}>
                    <input
                      className={styles.ResetPasswordForm__inputField}
                      type={isNewPasswordValueShown ? 'text' : 'password'}
                      name='newPassword'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                    />
                    <div className={styles.ResetPasswordForm__iconSHowHidePassword}>
                      <IconButton
                        onClick={() => setIsNewPasswordValueShown(!isNewPasswordValueShown)}
                      >
                        {isNewPasswordValueShown ? (
                          <PasswordNonVisibilityEyeSVG />
                        ) : (
                          <PasswordVisibilityEyeSVG />
                        )}
                      </IconButton>
                    </div>
                  </div>
                </label>
                {touched.newPassword && errors.newPassword && (
                  <div className={styles.ResetPasswordForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.ResetPasswordForm__warningMessage}>
                      {errors.newPassword}
                    </div>
                  </div>
                )}
                <div className={styles.ResetPasswordForm__requirements}>{t('password_length_requirement')}</div>
                <label htmlFor='confirmPassword' className={styles.ResetPasswordForm__inputLabel}>
                  {t('confirm_password_input_label')}
                  <div className={styles.ResetPasswordForm__passwordDataContainer}>
                    <input
                      className={styles.ResetPasswordForm__inputField}
                      type={isConfirmPasswordValueShown ? 'text' : 'password'}
                      name='confirmPassword'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <div className={styles.ResetPasswordForm__iconSHowHidePassword}>
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
                  <div className={styles.ResetPasswordForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.ResetPasswordForm__warningMessage}>
                      {errors.confirmPassword}
                    </div>
                  </div>
                )}
                <div className={styles.ResetPasswordForm__requirements}>{t('password_length_requirement')}</div>
                <button
                  className={styles.ResetPasswordForm__submitButton}
                  onClick={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                  type='submit'
                >
                  {t('title_button_reset_password')}
                </button>
              </>
            )}
          </Formik>
        )}
        <Link to={AllRoutes.SIGN_IN} className={styles.ResetPasswordForm__linkBack}>
          {t('link_back')}
        </Link>
      </div>
    </div>
  );
}
