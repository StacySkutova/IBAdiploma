import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';

// import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { selectUserData } from '../../../app/store/userReducer';

export default function WorkoutPlans(): ReactElement {
  const authUserInfo = useSelector(selectUserData);

  // const { t } = useTranslation();

  return (
    <div className={styles.WorkoutPlans__wrapper}>
      <div className={styles.WorkoutPlans__type}>Ваш тип тренировок: <span>{authUserInfo.workoutType}</span></div>
      <div className={styles.WorkoutPlans__numberPerWeek}>Рекомендуемое количество занятий в
        неделю: <span>{authUserInfo.perWeekWorkoutNumber}</span></div>
      <div className={styles.WorkoutPlans__videos}>
        <div className={styles.WorkoutPlans__videoBlock}>
          <div className={styles.WorkoutPlans__videoTitle}>Первая тренировка</div>
          <ReactPlayer url={authUserInfo.firstPerWeekVideosWorkout} controls width='250px' height='200px' />
        </div>
        <div className={styles.WorkoutPlans__videoBlock}>
          <div className={styles.WorkoutPlans__videoTitle}>Вторая тренировка</div>
          <ReactPlayer url={authUserInfo.secondPerWeekVideosWorkout} controls width='250px' height='200px' />
        </div>
        <div className={styles.WorkoutPlans__videoBlock}>
          <div className={styles.WorkoutPlans__videoTitle}>Третья тренировка</div>
          <ReactPlayer url={authUserInfo.thirdPerWeekVideosWorkout} controls width='250px' height='200px' />
        </div>
      </div>
    </div>
  );
}
