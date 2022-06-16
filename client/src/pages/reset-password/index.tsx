import { ReactElement } from 'react';

import ResetPasswordForm from './_ui/reset-password-form';

import styles from './styles.module.scss';

export default function ResetPassword(): ReactElement {
  return (
    <div className={styles.ResetPassword__pageWrapper}>
      <ResetPasswordForm />
    </div>
  );
}
