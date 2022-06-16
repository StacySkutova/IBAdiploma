import { ReactElement } from 'react';

import SignInForm from './_ui/signin-form';

import styles from './styles.module.scss';

export default function SignIn(): ReactElement {
  return (
    <div className={styles.SignIn__pageWrapper}>
      <SignInForm />
    </div>
  );
}
