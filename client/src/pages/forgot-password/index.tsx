import { ReactElement } from 'react';

import ForgotPasswordForm from './_ui/forgot-password-form';

import styles from './styles.module.scss';

export default function ForgotPassword(): ReactElement {
  return (
    <div className={styles.ForgotPassword__pageWrapper}>
      <ForgotPasswordForm />
    </div>
  );
}
