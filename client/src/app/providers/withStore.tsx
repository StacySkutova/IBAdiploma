import { Provider } from 'react-redux';

import store from 'app/store';

const withStore = (App) => function AppWithStore() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default withStore;
