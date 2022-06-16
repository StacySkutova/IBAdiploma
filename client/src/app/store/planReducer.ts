import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { axiosInstance } from 'shared/api/http-common';

export const planSlice = createSlice({
  name: 'chart',
  initialState: {
    planData: {},
    isPlanDataLoading: false,
    planDataError: null,
  },
  reducers: {
    setPlanData: (state, action) => {
      state.planData = action.payload;
    },
    setIsPlanDataLoading: (state, action) => {
      state.isPlanDataLoading = action.payload;
    },
    setPlanDataError: (state, action) => {
      state.planDataError = action.payload;
    },
  },
});

export const { setPlanData, setIsPlanDataLoading, setPlanDataError } = planSlice.actions;

export const sendQuestions = function(survey, userName) {
  return async (dispatch) => {
    dispatch(setIsPlanDataLoading(true));
    const payload = { survey, userName };
    try {
      const response = await axiosInstance.post('plan-creation', payload);
      console.log(response.data);
      dispatch(setPlanData(
        {
          firstQuestion: response.data.firstQuestion,
          secondQuestion: response.data.secondQuestion,
          thirdQuestion: response.data.thirdQuestion,
          workoutType: response.data.workoutType,
          perWeekWorkoutNumber: response.data.perWeekWorkoutNumber,
          videosWorkout: response.data.videosWorkout,
          perDayMealNumber: response.data.perDayMealNumber,
          menu: response.data.menu,
        },
      ));
    } catch (err) {
      dispatch(setPlanDataError('Failed'));
      toast.error('Failed');
    }
    dispatch(setIsPlanDataLoading(false));
  };
};


export const selectPlanData = (state): any => state.plan.planData;
export const selectIsPlanDataLoading = (state): boolean => state.plan.isPlanDataLoading;
export const selectPlanDataError = (state): any => state.plan.planDataError;

export default planSlice.reducer;
