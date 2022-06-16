import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import AllRoutes from 'shared/config/routes';

import styles from './styles.module.scss';

function NotFound(): ReactElement {
  return (
    <div className={styles.NotFound__pageWrapper}>
      <div className={styles.NotFound__errorCode}>404</div>
      <div className={styles.NotFound__errorDescription}>Page Not Found</div>
      <div className={styles.NotFound__message}>
        <div>Sorry, the content you’re looking for doesn’t exist.</div>
        <div>Either it was removed, or you mistyped the link.</div>
      </div>
      <div className={styles.NotFound__buttonsBlock}>
        <Link to={AllRoutes.SIGN_IN} className={styles.NotFound__linkBack}>
          Back
        </Link>
        <Link to={AllRoutes.SIGN_IN} className={styles.NotFound__linkHome}>
          Go to home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
