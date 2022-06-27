import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { axiosInstance } from 'shared/api/http-common';
import axios from 'axios';

export const planSlice = createSlice({
  name: 'chart',
  initialState: {
    planData: {},
    plansList: [],
    isPlanDataLoading: false,
    planDataError: null,
  },
  reducers: {
    setPlanData: (state, action) => {
      state.planData = action.payload;
    },
    setPlansList: (state, action) => {
      state.plansList = action.payload;
    },
    setIsPlanDataLoading: (state, action) => {
      state.isPlanDataLoading = action.payload;
    },
    setPlanDataError: (state, action) => {
      state.planDataError = action.payload;
    },
  },
});

export const { setPlanData, setPlansList, setIsPlanDataLoading, setPlanDataError } =
  planSlice.actions;

export const sendQuestions = function (survey, userName) {
  return async (dispatch) => {
    dispatch(setIsPlanDataLoading(true));
    const payload = { survey, userName };
    try {
      const response = await axiosInstance.post('plan-creation', payload);
      console.log(response.data);
      dispatch(
        setPlanData({
          firstQuestion: response.data.firstQuestion,
          secondQuestion: response.data.secondQuestion,
          thirdQuestion: response.data.thirdQuestion,
          workoutType: response.data.workoutType,
          perWeekWorkoutNumber: response.data.perWeekWorkoutNumber,
          videosWorkout: response.data.videosWorkout,
          perDayMealNumber: response.data.perDayMealNumber,
          menu: response.data.menu,
        })
      );
    } catch (err) {
      dispatch(setPlanDataError('Failed'));
      toast.error('Failed');
    }
    dispatch(setIsPlanDataLoading(false));
  };
};

export const getAllPlansDataAsyncFromBackend = function () {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/plans-find');
      console.log(response);
      dispatch(setPlansList(response.data));
      console.log(response.data);
    } catch (err) {
      toast.error('Plan data failed');
    }
  };
};

export const selectPlanData = (state): any => state.plan.planData;
export const selectPlansList = (state): any => state.plan.plansList;
export const selectIsPlanDataLoading = (state): boolean => state.plan.isPlanDataLoading;
export const selectPlanDataError = (state): any => state.plan.planDataError;

export default planSlice.reducer;
