import authReducer from './authReducer';
import userReducer from './userReducer';
import planReducer from './planReducer';

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  plan: planReducer,
};

export default rootReducer;
