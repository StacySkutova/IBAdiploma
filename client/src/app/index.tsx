import { ReactElement, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from 'app/layout';
import Pages from 'pages';
import withStore from './providers/withStore';
import withBrowserRouter from './providers/withBrowserRouter';

import styles from './index.module.scss';

function App(): ReactElement {
  return (
    <Layout>
      <ToastContainer position="top-right" />
      <Suspense
        fallback={
          <div className={styles.App__suspenseLoader}>
            <CircularProgress />
          </div>
        }
      >
        <Pages />
      </Suspense>
    </Layout>
  );
}

export default withStore(withBrowserRouter(App));
