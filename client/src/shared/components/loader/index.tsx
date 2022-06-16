import { ReactElement } from 'react';
import { CircularProgress } from '@mui/material';

import styles from './styles.module.scss';

export default function Loader(): ReactElement {
  return (
    <div className={styles.Loader__wrapper}>
      <CircularProgress />
    </div>
  );
}
