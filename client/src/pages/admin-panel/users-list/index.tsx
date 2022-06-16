import React, { ReactElement } from 'react';

// import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

export default function UsersList(): ReactElement {

  // const { t } = useTranslation();

  return (
    <div className={styles.UsersList__wrapper}>
      Привет
    </div>
  );
}
