import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { getAllUserDataAsyncFromBackend } from 'app/store/userReducer';
import { getAllPlansDataAsyncFromBackend } from 'app/store/planReducer';
import { PlansListIconSVG, UsersListIconSVG } from 'shared/svgs';

import styles from './styles.module.scss';

export default function AdminNavbar(): ReactElement {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const determineIsActiveClassName = ({ isActive }): string =>
    isActive ? styles.AdminNavbar__activeLinkItem : styles.AdminNavbar__linkItem;

  return (
    <div className={styles.AdminNavbar__wrapper}>
      <div className={styles.AdminNavbar__container}>
        <NavLink
          to="users-list"
          className={determineIsActiveClassName}
          onClick={() => {
            dispatch(getAllUserDataAsyncFromBackend());
          }}
        >
          <UsersListIconSVG fill="currentcolor" />
          <span className={styles.AdminNavbar__linkText}>{t('active_users_list')}</span>
        </NavLink>
        <NavLink
          to="plans-list"
          className={determineIsActiveClassName}
          onClick={() => {
            dispatch(getAllPlansDataAsyncFromBackend());
          }}
        >
          <PlansListIconSVG fill="currentcolor" />
          <span className={styles.AdminNavbar__linkText}>{t('existent_plans_list')}</span>
        </NavLink>
      </div>
    </div>
  );
}
