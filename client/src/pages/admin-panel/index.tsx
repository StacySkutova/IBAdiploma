import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminNavbar from './_ui/admin-navbar';
import UsersList from './users-list';
import PlansList from './plans-list';

import styles from './styles.module.scss';

export default function UserProfilePage(): ReactElement {
  return (
    <div className={styles.UserProfilePage__pageWrapper}>
      <AdminNavbar />
      <Routes>
        <Route path="users-list" element={<UsersList />} />
        <Route path="plans-list" element={<PlansList />} />
      </Routes>
    </div>
  );
}
