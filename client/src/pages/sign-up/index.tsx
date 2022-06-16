import { ReactElement } from 'react';

import SignUpForm from './_ui/signup-form';

import styles from './styles.module.scss';

export default function SignUp(): ReactElement {
  return (
    <div className={styles.SignUp__pageWrapper}>
      <SignUpForm />
    </div>
  );
}
