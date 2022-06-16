import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { axiosInstance } from 'shared/api/http-common';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    isUserDataLoading: false,
    isUserDataSuccess: false,
    userDataError: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsUserDataLoading: (state, action) => {
      state.isUserDataLoading = action.payload;
    },
    setIsUserDataSuccess: (state, action) => {
      state.isUserDataSuccess = action.payload;
    },
    setUserDataError: (state, action) => {
      state.userDataError = action.payload;
    },
  },
});

export const { setUserData, setIsUserDataLoading, setIsUserDataSuccess, setUserDataError } = userSlice.actions;

export const getUserDataAsync = function({ userName, email, password }) {
  return async (dispatch) => {
    dispatch(setIsUserDataLoading(true));
    const payloadData = { userName, email, password };
    try {
      await axiosInstance.post('user-data-update', payloadData);
      dispatch(setUserData({ userName, email, password }));
      toast.success('User data updated');
    } catch (err) {
      toast.error('User data failed');
    }
    dispatch(setIsUserDataLoading(false));
  };
};

export const getUserDataAsyncFromBackend = function(userName) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/user-find/${userName}`);
      dispatch(setUserData(
        {
          userName: response.data.userName,
          workoutType: response.data.plan.workoutType,
          perWeekWorkoutNumber: response.data.plan.perWeekWorkoutNumber,
          firstPerWeekVideosWorkout: response.data.plan.videosWorkout.firstPerWeek,
          secondPerWeekVideosWorkout: response.data.plan.videosWorkout.secondPerWeek,
          thirdPerWeekVideosWorkout: response.data.plan.videosWorkout.thirdPerWeek,
          perDayMealNumber: response.data.plan.perDayMealNumber,

          mondayFirstMealName: response.data.plan.menu.monday.firstMeal.name,
          mondayFirstMealCalories: response.data.plan.menu.monday.firstMeal.calories,
          mondaySecondMealName: response.data.plan.menu.monday.secondMeal.name,
          mondaySecondMealCalories: response.data.plan.menu.monday.secondMeal.calories,
          mondayThirdMealName: response.data.plan.menu.monday.thirdMeal.name,
          mondayThirdMealCalories: response.data.plan.menu.monday.thirdMeal.calories,

          tuesdayFirstMealName: response.data.plan.menu.tuesday.firstMeal.name,
          tuesdayFirstMealCalories: response.data.plan.menu.tuesday.firstMeal.calories,
          tuesdaySecondMealName: response.data.plan.menu.tuesday.secondMeal.name,
          tuesdaySecondMealCalories: response.data.plan.menu.tuesday.secondMeal.calories,
          tuesdayThirdMealName: response.data.plan.menu.tuesday.thirdMeal.name,
          tuesdayThirdMealCalories: response.data.plan.menu.tuesday.thirdMeal.calories,

          wednesdayFirstMealName: response.data.plan.menu.wednesday.firstMeal.name,
          wednesdayFirstMealCalories: response.data.plan.menu.wednesday.firstMeal.calories,
          wednesdaySecondMealName: response.data.plan.menu.wednesday.secondMeal.name,
          wednesdaySecondMealCalories: response.data.plan.menu.wednesday.secondMeal.calories,
          wednesdayThirdMealName: response.data.plan.menu.wednesday.thirdMeal.name,
          wednesdayThirdMealCalories: response.data.plan.menu.wednesday.thirdMeal.calories,

          thursdayFirstMealName: response.data.plan.menu.thursday.firstMeal.name,
          thursdayFirstMealCalories: response.data.plan.menu.thursday.firstMeal.calories,
          thursdaySecondMealName: response.data.plan.menu.thursday.secondMeal.name,
          thursdaySecondMealCalories: response.data.plan.menu.thursday.secondMeal.calories,
          thursdayThirdMealName: response.data.plan.menu.thursday.thirdMeal.name,
          thursdayThirdMealCalories: response.data.plan.menu.thursday.thirdMeal.calories,

          fridayFirstMealName: response.data.plan.menu.friday.firstMeal.name,
          fridayFirstMealCalories: response.data.plan.menu.friday.firstMeal.calories,
          fridaySecondMealName: response.data.plan.menu.friday.secondMeal.name,
          fridaySecondMealCalories: response.data.plan.menu.friday.secondMeal.calories,
          fridayThirdMealName: response.data.plan.menu.friday.thirdMeal.name,
          fridayThirdMealCalories: response.data.plan.menu.friday.thirdMeal.calories,

          saturdayFirstMealName: response.data.plan.menu.saturday.firstMeal.name,
          saturdayFirstMealCalories: response.data.plan.menu.saturday.firstMeal.calories,
          saturdaySecondMealName: response.data.plan.menu.saturday.secondMeal.name,
          saturdaySecondMealCalories: response.data.plan.menu.saturday.secondMeal.calories,
          saturdayThirdMealName: response.data.plan.menu.saturday.thirdMeal.name,
          saturdayThirdMealCalories: response.data.plan.menu.saturday.thirdMeal.calories,

          sundayFirstMealName: response.data.plan.menu.sunday.firstMeal.name,
          sundayFirstMealCalories: response.data.plan.menu.sunday.firstMeal.calories,
          sundaySecondMealName: response.data.plan.menu.sunday.secondMeal.name,
          sundaySecondMealCalories: response.data.plan.menu.sunday.secondMeal.calories,
          sundayThirdMealName: response.data.plan.menu.sunday.thirdMeal.name,
          sundayThirdMealCalories: response.data.plan.menu.sunday.thirdMeal.calories,
        },
      ));
    } catch (err) {
      toast.error('User data failed');
    }
  };
};

export const selectUserData = (state): any => state.user.userData;
export const selectIsUserDataLoading = (state): boolean => state.user.isUserDataLoading;
export const selectIsUserDataSuccess = (state): boolean => state.user.isUserDataSuccess;
export const selectUserDataError = (state): boolean => state.user.userDataError;

export default userSlice.reducer;
