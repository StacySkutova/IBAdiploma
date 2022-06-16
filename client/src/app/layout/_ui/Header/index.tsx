import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  selectIsAuthenticated,
} from 'app/store/authReducer';
import ProfileContent from './profile-content';

import styles from './styles.module.scss';

function Header(): ReactElement {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <header className={styles.Header__wrapper}>
      <div className={styles.Header__container}>
        <Link to='/user-profile/home-page' className={styles.Header__logoLink}>
          Health
          <span>&</span>
          <span>Fitness</span>
        </Link>
        <div className={styles.Header__userWrapper}>
          {isAuthenticated && (<ProfileContent />)}
        </div>
      </div>
    </header>
  );
}

export default Header;
