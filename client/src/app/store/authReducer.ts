import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { axiosInstance } from 'shared/api/http-common';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    authUserInfo: {},

    isSignInFormLoading: false,
    signInFormError: null,

    isSignOutLoading: false,
    signOutError: null,

    isSignUpFormLoading: false,
    isSignUpSuccess: false,
    signUpFormError: null,

    isForgotPasswordFormLoading: false,
    isForgotPasswordSuccess: false,
    forgotPasswordFormError: null,

    isResetPasswordFormLoading: false,
    isResetPasswordSuccess: false,
    resetPasswordFormError: null,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthUserInfo: (state, action) => {
      state.authUserInfo = action.payload;
    },
    setIsSignInFormLoading: (state, action) => {
      state.isSignInFormLoading = action.payload;
    },
    setSignInFormError: (state, action) => {
      state.signInFormError = action.payload;
    },
    setIsSignOutLoading: (state, action) => {
      state.isSignOutLoading = action.payload;
    },
    setSignOutError: (state, action) => {
      state.signOutError = action.payload;
    },
    setIsSignUpFormLoading: (state, action) => {
      state.isSignUpFormLoading = action.payload;
    },
    setIsSignUpSuccess: (state, action) => {
      state.isSignUpSuccess = action.payload;
    },
    setSignUpFormError: (state, action) => {
      state.signUpFormError = action.payload;
    },
    setIsForgotPasswordFormLoading: (state, action) => {
      state.isForgotPasswordFormLoading = action.payload;
    },
    setIsForgotPasswordSuccess: (state, action) => {
      state.isForgotPasswordSuccess = action.payload;
    },
    setForgotPasswordFormError: (state, action) => {
      state.forgotPasswordFormError = action.payload;
    },
    setIsResetPasswordFormLoading: (state, action) => {
      state.isForgotPasswordFormLoading = action.payload;
    },
    setIsResetPasswordSuccess: (state, action) => {
      state.isResetPasswordSuccess = action.payload;
    },
    setResetPasswordFormError: (state, action) => {
      state.resetPasswordFormError = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setAuthUserInfo,
  setIsSignInFormLoading,
  setSignInFormError,
  setIsSignOutLoading,
  setSignOutError,
  setIsSignUpFormLoading,
  setIsSignUpSuccess,
  setSignUpFormError,
  setIsForgotPasswordFormLoading,
  setIsForgotPasswordSuccess,
  setForgotPasswordFormError,
  setIsResetPasswordFormLoading,
  setIsResetPasswordSuccess,
  setResetPasswordFormError,
} = authSlice.actions;

export const authByBackend = function({ userName, password }) {
  return async (dispatch) => {
    dispatch(setIsSignInFormLoading(true));
    const payloadData = { userName, password };
    try {
      if (document.cookie.slice(8) === 'ru') {
        const responseRU = await axiosInstance.post('sign-in', payloadData, {
          headers: {
            'accept-language': 'ru',
          },
        });
        dispatch(setAuthUserInfo({
          userName,
          password,
          email: responseRU.data.email,
          avatar: responseRU.data.avatar,
          role: responseRU.data.role,
        }));
      }
      if (document.cookie.slice(8) === 'us') {
        const responseUS = await axiosInstance.post('sign-in', payloadData, {
          headers: {
            'accept-language': 'us',
          },
        });
        dispatch(setAuthUserInfo({
          userName,
          password,
          email: responseUS.data.email,
          avatar: responseUS.data.avatar,
          role: responseUS.data.role,
        }));
      }
      dispatch(setIsAuthenticated(true));
    } catch (err: any) {
      dispatch(setSignInFormError(err.response.data.message));
    }
    dispatch(setIsSignInFormLoading(false));
  };
};

export const regByBackend = function({ userName, email, password, confirmPassword }) {
  return async (dispatch) => {
    dispatch(setIsSignUpFormLoading(true));
    const payloadData = { userName, email, password, confirmPassword };
    try {
      if (document.cookie.slice(8) === 'ru') {
        await axiosInstance.post('sign-up', payloadData, {
          headers: {
            'accept-language': 'ru',
          },
        });
      }
      if (document.cookie.slice(8) === 'us') {
        await axiosInstance.post(
          'sign-up', payloadData, {
            headers: {
              'accept-language': 'us',
            },
          });
      }
      dispatch(setIsSignUpSuccess(true));
    } catch (err: any) {
      dispatch(setSignUpFormError(err.response.data.message));
    }
    dispatch(setIsSignUpFormLoading(false));
  };
};

export const signOutByBackend = function() {
  return async (dispatch) => {
    dispatch(setIsSignOutLoading(true));
    try {
      dispatch(setAuthUserInfo({}));
      dispatch(setIsAuthenticated(false));
    } catch (err) {
      toast.error('Sign out failed');
    }
    dispatch(setIsSignOutLoading(false));
  };
};

export const forgotPasswordByBackend = function(email) {
  return async (dispatch) => {
    dispatch(setIsForgotPasswordFormLoading(true));
    const payloadData = email;
    try {
      const configAcceptLanguageHeader = {
        headers: {
          'accept-language': 'us',
        },
      };
      if (document.cookie.slice(8) === 'ru') {
        await axiosInstance.post('forgot', payloadData);
      }
      await axiosInstance.post('forgot', payloadData, configAcceptLanguageHeader);
      dispatch(setIsForgotPasswordSuccess(true));
    } catch (err) {
      toast.error('Кажется, что не существует пользователя с указанным ранее элекронным адресом. Пожалйста, проверьте правильность электронного адреса и/или обратитесь к администратору.');
    }
    dispatch(setIsForgotPasswordFormLoading(false));
  };
};

export const resetPasswordByBackend = function({ email, newPassword, confirmPassword }) {
  return async (dispatch) => {
    dispatch(setIsResetPasswordFormLoading(true));
    const payloadData = { email, newPassword, confirmPassword };
    try {
      const configAcceptLanguageHeader = {
        headers: {
          'accept-language': 'us',
        },
      };
      if (document.cookie.slice(8) === 'ru') {
        await axiosInstance.post('reset', payloadData);
      }
      await axiosInstance.post('reset', payloadData, configAcceptLanguageHeader);
      dispatch(setIsResetPasswordSuccess(true));
    } catch (err) {
      toast.error('Пароли не вовпадают.');
    }
    dispatch(setIsResetPasswordFormLoading(false));
  };
};

export const selectIsAuthenticated = (state): boolean => state.auth.isAuthenticated;

export const selectAuthUserInfo = (state): any => state.auth.authUserInfo;

export const selectIsSignInFormLoading = (state): boolean => state.auth.isSignInFormLoading;
export const selectSignInFormError = (state): any => state.auth.signInFormError;

export const selectIsSignOutLoading = (state): boolean => state.auth.isSignOutLoading;
export const selectSignOutError = (state): any => state.auth.signOutError;

export const selectIsSignUpFormLoading = (state): boolean => state.auth.isSignUpFormLoading;
export const selectIsSignUpSuccess = (state): boolean => state.auth.isSignUpSuccess;
export const selectSignUpFormError = (state): any => state.auth.signUpFormError;

export const selectIsForgotPasswordFormLoading = (state): boolean => state.auth.isForgotPasswordFormLoading;
export const selectIsForgotPasswordSuccess = (state): boolean => state.auth.isForgotPasswordSuccess;
export const selectForgotPasswordFormError = (state): any => state.auth.forgotPasswordFormError;

export const selectIsResetPasswordFormLoading = (state): boolean => state.auth.isResetPasswordFormLoading;
export const selectIsResetPasswordSuccess = (state): boolean => state.auth.isResetPasswordSuccess;
export const selectResetPasswordFormError = (state): any => state.auth.resetPasswordFormError;

export default authSlice.reducer;
