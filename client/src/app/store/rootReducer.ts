import authReducer from './authReducer';
import planReducer from './planReducer';
import userReducer from './userReducer';

const rootReducer = {
  user: userReducer,
  auth: authReducer,
  plan: planReducer,
};

export default rootReducer;
