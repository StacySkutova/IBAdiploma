import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import AllRoutes from 'shared/config/routes';

import styles from './styles.module.scss';

function NotFound(): ReactElement {
  return (
    <div className={styles.NotFound__pageWrapper}>
      <div className={styles.NotFound__errorCode}>404</div>
      <div className={styles.NotFound__errorDescription}>Страница не найдена</div>
      <div className={styles.NotFound__message}>
        <div>Простите, но то, что Вы ищете, не существует</div>
        <div>Либо этот контен был удален, либо Вы ввели неверную ссылку</div>
      </div>
      <div className={styles.NotFound__buttonsBlock}>
        <Link to={AllRoutes.SIGN_IN} className={styles.NotFound__linkBack}>
          Назад
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
