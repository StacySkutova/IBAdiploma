import { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IconButton } from '@mui/material';
// import { useTranslation } from 'react-i18next';

import { getUserDataAsync } from 'app/store/userReducer';
import { PasswordNonVisibilityEyeSVG, PasswordVisibilityEyeSVG, WarningIconSVG } from 'shared/svgs';

import styles from './styles.module.scss';

export default function ModalAddUserProfile({ modalActive, setModalActive }): ReactElement {
  const dispatch = useDispatch();

  const [isPasswordValueShown, setIsPasswordValueShown] = useState(false);

  // const { t } = useTranslation();

  const validationsSchema = yup.object().shape({
    userName: yup.string().required('Не может быть пустым!'),
    email: yup.string().email('Введите корректный e-mail').required('Не может быть пустым!'),
    password: yup.string(),
  });

  return (
    <div
      className={cn([
        styles.ModalUserProfile__wrapper,
        { [styles.ModalUserProfile__wrapperActiveStatus]: modalActive === true },
      ])}
      onClick={() => setModalActive(false)}
    >
      <div className={styles.ModalUserProfile__content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ModalUserProfile__greatingPhrase}>Добавить пользователя</div>
        <div className={styles.ModalUserProfile__inputsBlock}>
          <Formik
            initialValues={{
              userName: '',
              email: '',
              password: '',
            }}
            validateOnBlur
            onSubmit={({ userName, email, password }): void => {
              dispatch(getUserDataAsync({ userName, email, password }));
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
                  Имя пользователя
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
                    <div className={styles.ModalUserProfile__warningMessage}>{errors.userName}</div>
                  </div>
                )}
                <label htmlFor="email" className={styles.ModalUserProfile__inputLabel}>
                  E-mail пользователя
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
                  Пароль
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
                      <IconButton
                        onClick={(): void => {
                          setIsPasswordValueShown(!isPasswordValueShown);
                        }}
                      >
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
                    <div className={styles.ModalUserProfile__warningMessage}>{errors.password}</div>
                  </div>
                )}
                <button
                  className={styles.ModalUserProfile__submitButton}
                  name="generalValidation"
                  onClick={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                  type="submit"
                >
                  Обновить данные
                </button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
