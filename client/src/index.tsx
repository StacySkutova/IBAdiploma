import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';

import App from 'app';
import reportWebVitals from 'app/reportWebVitals';
import 'shared/translation/118n.js';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'tippy.js/dist/tippy.css';
import 'app/styles/global.scss';
import styles from './app/index.module.scss';

ReactDOM.render(
  <StrictMode>
    <Suspense
      fallback={
        <div className={styles.App__suspenseLoader}>
          <CircularProgress />
        </div>
      }
    >
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
