import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PlansListIconSVG, UsersListIconSVG } from 'shared/svgs';

import styles from './styles.module.scss';

export default function AdminNavbar(): ReactElement {

  const { t } = useTranslation();

  const determineIsActiveClassName = ({ isActive }): string =>
    isActive ? styles.AdminNavbar__activeLinkItem : styles.AdminNavbar__linkItem;

  return (
    <div className={styles.AdminNavbar__wrapper}>
      <div className={styles.AdminNavbar__container}>
        <NavLink to='users-list' className={determineIsActiveClassName}>
          <UsersListIconSVG fill='currentcolor' />
          <span className={styles.AdminNavbar__linkText}>{t('active_users_list')}</span>
        </NavLink>
        <NavLink to='plans-list' className={determineIsActiveClassName}>
          <PlansListIconSVG fill='currentcolor' />
          <span className={styles.AdminNavbar__linkText}>{t('existent_plans_list')}</span>
        </NavLink>
      </div>
    </div>
  );
}
