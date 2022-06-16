import { ReactNode, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../store/authReducer';
import Header from './_ui/Header';
import Footer from './_ui/Footer';

import styles from './styles.module.scss';

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps): ReactElement {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated)
    return (
      <div className={styles.Layout__wrapper}>
        <Header />
        <div className={styles.Layout__inner}>{children}</div>
        <Footer />
      </div>
    );

  return <div>{children}</div>;
}

export default Layout;
