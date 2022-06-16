import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const Plan = new Schema({
  firstQuestion: { type: String, require: true },
  secondQuestion: { type: String, require: true },
  thirdQuestion: { type: String, require: true },
  workoutType: { type: String },
  perWeekWorkoutNumber: { type: Number },
  videosWorkout: {
    firstPerWeek: { type: String },
    secondPerWeek: { type: String },
    thirdPerWeek: { type: String },
  },
  perDayMealNumber: { type: Number },
  menu: {
    monday: {
      firstMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      secondMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      thirdMeal: {
        name: { type: String },
        calories: { type: Number },
      },
    },
    tuesday: {
      firstMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      secondMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      thirdMeal: {
        name: { type: String },
        calories: { type: Number },
      },
    },
    wednesday: {
      firstMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      secondMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      thirdMeal: {
        name: { type: String },
        calories: { type: Number },
      },
    },
    thursday: {
      firstMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      secondMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      thirdMeal: {
        name: { type: String },
        calories: { type: Number },
      },
    },
    friday: {
      firstMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      secondMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      thirdMeal: {
        name: { type: String },
        calories: { type: Number },
      },
    },
    saturday: {
      firstMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      secondMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      thirdMeal: {
        name: { type: String },
        calories: { type: Number },
      },
    },
    sunday: {
      firstMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      secondMeal: {
        name: { type: String },
        calories: { type: Number },
      },
      thirdMeal: {
        name: { type: String },
        calories: { type: Number },
      },
    },
  },
});

export default model('Plan', Plan);
