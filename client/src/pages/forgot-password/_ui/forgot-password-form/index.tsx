import { ReactElement, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  forgotPasswordByBackend,
  selectIsForgotPasswordFormLoading,
  selectIsForgotPasswordSuccess,
  setForgotPasswordFormError,
  setIsForgotPasswordSuccess,
} from 'app/store/authReducer';
import AllRoutes from 'shared/config/routes';
import { WarningIconSVG, CheckedIconSVG } from 'shared/svgs';
import Loader from 'shared/components/loader';
import LanguageSelector from 'shared/components/language-selector';

import styles from './styles.module.scss';

export default function ForgotPasswordForm(): ReactElement {
  const dispatch = useDispatch();

  const isForgotPasswordFormLoading = useSelector(selectIsForgotPasswordFormLoading);
  const isForgotPasswordSuccess = useSelector(selectIsForgotPasswordSuccess);

  const { t } = useTranslation();

  const validationsSchema = yup.object().shape({
    email: yup.string().email(t('warning_incorrectness')).required(t('warning_required')),
  });

  useEffect(() => {
    dispatch(setIsForgotPasswordSuccess(false));
    dispatch(setForgotPasswordFormError(null));
  }, []);

  return (
    <div className={styles.ForgotPasswordForm__pageWrapper}>
      {isForgotPasswordFormLoading && <Loader />}
      <div className={styles.ForgotPasswordForm__content}>
        <div className={styles.ForgotPasswordForm__greatingPhrase}>{t('title_link_forgot_password')}
          <LanguageSelector /></div>
        {isForgotPasswordSuccess && (
          <div className={styles.ForgotPasswordForm__infoBlock}>
            <CheckedIconSVG />
            <div className={styles.ForgotPasswordForm__infoMessage}>
              <div>{t('message_forgot_password_success_part1')}</div>
              <div>{t('message_forgot_password_success_part2')}</div>
            </div>
          </div>
        )}
        {!isForgotPasswordSuccess && (
          <Formik
            initialValues={{
              email: '',
            }}
            validateOnBlur
            onSubmit={(email): void => {
              dispatch(forgotPasswordByBackend(email));
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
                <label htmlFor='email' className={styles.ForgotPasswordForm__inputLabel}>
                  {t('email_input_label')}
                  <input
                    className={styles.ForgotPasswordForm__inputField}
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </label>
                {touched.email && errors.email && (
                  <div className={styles.ForgotPasswordForm__warningBlock}>
                    <WarningIconSVG />
                    <div className={styles.ForgotPasswordForm__warningMessage}>{errors.email}</div>
                  </div>
                )}
                <button
                  className={styles.ForgotPasswordForm__submitButton}
                  onClick={() => handleSubmit()}
                  disabled={!isValid || !dirty || isForgotPasswordFormLoading}
                  type='submit'
                >
                  {t('send_link')}
                </button>
              </>
            )}
          </Formik>
        )}
        <Link to={AllRoutes.SIGN_IN} className={styles.ForgotPasswordForm__linkBack}>
          {t('link_back')}
        </Link>
      </div>
    </div>
  );
}
