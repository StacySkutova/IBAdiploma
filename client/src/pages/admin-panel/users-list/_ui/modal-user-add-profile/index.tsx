import { ReactElement, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { regByBackend, selectIsSignUpSuccess, setIsSignUpSuccess } from 'app/store/authReducer';
import {
  WarningIconSVG,
  PasswordVisibilityEyeSVG,
  PasswordNonVisibilityEyeSVG,
  CheckedIconSVG,
} from 'shared/svgs';

import styles from './styles.module.scss';

export default function ModalAddUserProfile({
  modalActive,
  setModalActive,
  setData,
  usersList,
}): ReactElement {
  const dispatch = useDispatch();

  const isSignUpSuccess = useSelector(selectIsSignUpSuccess);

  const [isPasswordValueShown, setIsPasswordValueShown] = useState(false);
  const [isConfirmPasswordValueShown, setIsConfirmPasswordValueShown] = useState(false);

  const { t } = useTranslation();

  const validationsSchema = yup.object().shape({
    userName: yup.string().required(t('warning_required')),
    email: yup.string().email(t('warning_correct_mail')).required(t('warning_required')),
    password: yup.string().required(t('warning_required')),
    confirmPassword: yup.string().required(t('warning_required')),
  });

  return (
    <div
      className={cn([
        styles.ModalUserProfile__wrapper,
        { [styles.ModalUserProfile__wrapperActiveStatus]: modalActive === true },
      ])}
    >
      <div className={styles.ModalUserProfile__content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ModalUserProfile__greatingPhrase}>Обновление данных</div>
        <div className={styles.ModalUserProfile__inputsBlock}>
          {isSignUpSuccess && (
            <div className={styles.SignUpForm__infoBlock}>
              <CheckedIconSVG />
              <div className={styles.SignUpForm__infoMessage}>
                <div>Your are registered now, please go back to signin page</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  dispatch(setIsSignUpSuccess(false));
                  setModalActive(false);
                  dispatch(setData(usersList));
                }}
              >
                Закрыть
              </button>
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
                  <label htmlFor="user-name" className={styles.ModalUserProfile__inputLabel}>
                    {t('user_input_label')}
                    <input
                      className={styles.ModalUserProfile__inputField}
                      type="text"
                      name="userName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userName}
                    />
                  </label>
                  {touched.userName && errors.userName && (
                    <div className={styles.ModalUserProfile__warningBlock}>
                      <WarningIconSVG />
                      <div className={styles.ModalUserProfile__warningMessage}>
                        {errors.userName}
                      </div>
                    </div>
                  )}
                  <label htmlFor="email" className={styles.ModalUserProfile__inputLabel}>
                    {t('email_input_label')}
                    <input
                      className={styles.ModalUserProfile__inputField}
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </label>
                  {touched.email && errors.email && (
                    <div className={styles.ModalUserProfile__warningBlock}>
                      <WarningIconSVG />
                      <div className={styles.ModalUserProfile__warningMessage}>{errors.email}</div>
                    </div>
                  )}
                  <label htmlFor="password" className={styles.ModalUserProfile__inputLabel}>
                    {t('new_password_input_label')}
                    <div className={styles.ModalUserProfile__passwordDataContainer}>
                      <input
                        className={styles.ModalUserProfile__inputField}
                        type={isPasswordValueShown ? 'text' : 'password'}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <div className={styles.ModalUserProfile__iconSHowHidePassword}>
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
                    <div className={styles.ModalUserProfile__warningBlock}>
                      <WarningIconSVG />
                      <div className={styles.ModalUserProfile__warningMessage}>
                        {errors.password}
                      </div>
                    </div>
                  )}
                  <label htmlFor="confirm-password" className={styles.ModalUserProfile__inputLabel}>
                    {t('confirm_password_input_label')}
                    <div className={styles.ModalUserProfile__passwordDataContainer}>
                      <input
                        className={styles.ModalUserProfile__inputField}
                        type={isConfirmPasswordValueShown ? 'text' : 'password'}
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />
                      <div className={styles.ModalUserProfile__iconSHowHidePassword}>
                        <IconButton
                          onClick={() =>
                            setIsConfirmPasswordValueShown(!isConfirmPasswordValueShown)
                          }
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
                    <div className={styles.ModalUserProfile__warningBlock}>
                      <WarningIconSVG />
                      <div className={styles.ModalUserProfile__warningMessage}>
                        {errors.confirmPassword}
                      </div>
                    </div>
                  )}
                  <button
                    className={styles.ModalUserProfile__submitButton}
                    name="generalValidation"
                    onClick={() => handleSubmit()}
                    disabled={!isValid || !dirty}
                    type="submit"
                  >
                    {t('link_button_registration')}
                  </button>
                </>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
