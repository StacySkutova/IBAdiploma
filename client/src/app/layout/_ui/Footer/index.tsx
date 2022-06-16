import { ReactElement } from 'react';

import styles from './styles.module.scss';

function Footer(): ReactElement {
  return (
    <footer className={styles.Footer__container}>
      made by Anastasiya Skutova, IBA group 2.20
    </footer>
  );
}

export default Footer;
