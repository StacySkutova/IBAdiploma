import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

import { deleteUserOnBackend } from 'app/store/userReducer';
import { selectPlansList } from 'app/store/planReducer';
import ModalUpdateUserProfile from './_ui/modal-user-update-profile';
import ModalAddUserProfile from './_ui/modal-user-add-profile';

import styles from './styles.module.scss';

export default function PlansList(): ReactElement {
  const dispatch = useDispatch();

  const plansList = useSelector(selectPlansList);

  const [modalUpdateUserActive, setModalUpdateUserActive] = useState(false);
  const [modalAddUserActive, setModalAddUserActive] = useState(false);

  // const { t } = useTranslation();

  return (
    <div className={styles.UsersList__wrapper}>
      {plansList.map((plan) => (
        <div key={plan.firstQuestion} className={styles.UsersList__userRow}>
          <li className={styles.UsersList__userColumn}>{plan.workoutType}</li>
          <div className={styles.UsersList__userColumn}>{plan.perWeekWorkoutNumber}</div>
          <div className={styles.UsersList__userColumn}>{plan.videosWorkout.firstPerWeek}</div>
          <div className={styles.UsersList__userColumn}>{plan.videosWorkout.secondPerWeek}</div>
          <div className={styles.UsersList__userColumn}>{plan.videosWorkout.thirdPerWeek}</div>
          <div className={styles.UsersList__userColumn}>{plan.perDayMealNumber}</div>
          <div className={styles.UsersList__userColumn}>{plan.menu.monday.firstMeal.name}</div>
          <div className={styles.UsersList__userColumn}>{plan.menu.monday.firstMeal.calories}</div>
          <div className={styles.UsersList__userColumn}>{plan.menu.monday.secondMeal.name}</div>
          <div className={styles.UsersList__userColumn}>{plan.menu.monday.secondMeal.calories}</div>
          <div className={styles.UsersList__userColumn}>{plan.menu.tuesday.secondMeal.name}</div>
          <div className={styles.UsersList__userButtonsBlock}>
            <button
              className={styles.UsersList__buttonUpdate}
              type="button"
              onClick={() => {
                dispatch(setModalUpdateUserActive(true));
              }}
            >
              Обновить
            </button>
            <button
              className={styles.UsersList__buttonDelete}
              type="button"
              onClick={() => {
                dispatch(deleteUserOnBackend('Stacy'));
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      <button
        className={styles.UsersList__buttonAdd}
        type="button"
        onClick={() => {
          dispatch(setModalAddUserActive(true));
        }}
      >
        Добавить план
      </button>
      <ModalUpdateUserProfile
        modalActive={modalUpdateUserActive}
        setModalActive={setModalUpdateUserActive}
      />
      <ModalAddUserProfile
        modalActive={modalAddUserActive}
        setModalActive={setModalAddUserActive}
      />
    </div>
  );
}
