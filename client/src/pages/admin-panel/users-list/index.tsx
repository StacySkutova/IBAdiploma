import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

import {
  deleteUserOnBackend,
  getAllUserDataAsyncFromBackend,
  selectUsersList,
} from 'app/store/userReducer';

import styles from './styles.module.scss';
import ModalUpdateUserProfile from './_ui/modal-user-update-profile';
import ModalAddUserProfile from './_ui/modal-user-add-profile';

export default function UsersList(): ReactElement {
  const dispatch = useDispatch();

  const usersList = useSelector(selectUsersList);

  const [modalUpdateUserActive, setModalUpdateUserActive] = useState(false);
  const [modalAddUserActive, setModalAddUserActive] = useState(false);
  const [data, setData] = useState(null);

  // const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllUserDataAsyncFromBackend());
  }, [data]);

  return (
    <div className={styles.UsersList__wrapper}>
      <div className={styles.UsersList__tableHeader}>
        <div className={styles.UsersList__tableHeaderName}>Имя</div>
        <div className={styles.UsersList__tableHeaderName}>Электронная почта</div>
        <div className={styles.UsersList__tableHeaderName}>Роль</div>
      </div>
      {usersList.map((user) => (
        <div key={user.userName} className={styles.UsersList__userRow}>
          {user.role !== 'admin' && (
            <>
              <li className={styles.UsersList__userColumn}>{user.userName}</li>
              <div className={styles.UsersList__userColumn}>{user.email}</div>
              <div className={styles.UsersList__userColumn}>{user.role}</div>
              <div className={styles.UsersList__userButtonsBlock}>
                <button
                  className={styles.UsersList__buttonUpdate}
                  type="button"
                  onClick={() => {
                    dispatch(setModalUpdateUserActive(true));
                  }}
                >
                  Обновить
                </button>
                <button
                  className={styles.UsersList__buttonDelete}
                  type="button"
                  onClick={() => {
                    dispatch(deleteUserOnBackend(user.userName));
                    dispatch(setData(usersList));
                  }}
                >
                  Удалить
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <button
        className={styles.UsersList__buttonAdd}
        type="button"
        onClick={() => {
          dispatch(setModalAddUserActive(true));
        }}
      >
        Добавить пользователя
      </button>
      <ModalUpdateUserProfile
        modalActive={modalUpdateUserActive}
        setModalActive={setModalUpdateUserActive}
        setData={setData}
        usersList={usersList}
      />
      <ModalAddUserProfile
        modalActive={modalAddUserActive}
        setModalActive={setModalAddUserActive}
        setData={setData}
        usersList={usersList}
      />
    </div>
  );
}
