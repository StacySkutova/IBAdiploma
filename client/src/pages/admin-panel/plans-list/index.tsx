/* eslint-disable */
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

import { deleteUserOnBackend, selectUserData } from 'app/store/userReducer';
import { selectPlansList } from 'app/store/planReducer';
import ModalUpdateUserProfile from './_ui/modal-user-update-profile';
import ModalAddUserProfile from './_ui/modal-user-add-profile';

import styles from './styles.module.scss';

export default function PlansList(): ReactElement {
  const dispatch = useDispatch();

  const authUserInfo = useSelector(selectUserData);

  const plansList = useSelector(selectPlansList);

  const [modalUpdateUserActive, setModalUpdateUserActive] = useState(false);
  const [modalAddUserActive, setModalAddUserActive] = useState(false);

  // const { t } = useTranslation();

  return (
    <div className={styles.UsersList__wrapper}>
      {plansList.map((plan) => (
        <div key={plan.firstQuestion} className={styles.UsersList__userRow}>
          <div className={styles.UsersList__tableHeader}>
            <div className={styles.UsersList__tableHeaderName}>Тип интенсивности</div>
            <div className={styles.UsersList__tableHeaderName}>Количество тренировок</div>
            <div className={styles.UsersList__tableHeaderName}>Количесто приемов пищи</div>
          </div>
          <div className={styles.UsersList__userColumnBlock}>
            <li className={styles.UsersList__userColumn}>{plan.workoutType}</li>
            <div className={styles.UsersList__userColumn}>{plan.perWeekWorkoutNumber}</div>
            <div className={styles.UsersList__userColumn}>{plan.perDayMealNumber}</div>
          </div>
          <div className={styles.UsersList__tableHeader}>
            <div className={styles.UsersList__tableHeaderName}>Первая тренировка</div>
            <div className={styles.UsersList__tableHeaderName}>Вторая тренировка</div>
            <div className={styles.UsersList__tableHeaderName}>Третья тренировка</div>
          </div>
          <div className={styles.UsersList__userColumnBlock}>
            <a
              href={plan.videosWorkout.firstPerWeek}
              target="_blank"
              className={styles.UsersList__userColumn}
            >
              Видео
            </a>
            <a
              href={plan.videosWorkout.secondPerWeek}
              target="_blank"
              className={styles.UsersList__userColumn}
            >
              Видео
            </a>
            <a
              href={plan.videosWorkout.secondPerWeek}
              target="_blank"
              className={styles.UsersList__userColumn}
            >
              Видео
            </a>
          </div>
          <div className={styles.MealPlans__menuPerDayTable}>
            <div className={styles.MealPlans__row}>
              <div className={styles.MealPlans__firstColumn}>Monday</div>
              <div className={styles.MealPlans__secondColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {plan.menu.monday.firstMeal.name}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {plan.menu.monday.firstMeal.calories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__thirdColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.mondaySecondMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.mondaySecondMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__forthColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.mondayThirdMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.mondayThirdMealCalories} ккал
                </div>
              </div>
            </div>

            <div className={styles.MealPlans__row}>
              <div className={styles.MealPlans__firstColumn}>Tuesday</div>
              <div className={styles.MealPlans__secondColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.tuesdayFirstMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.tuesdayFirstMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__thirdColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.tuesdaySecondMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.tuesdaySecondMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__forthColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.tuesdayThirdMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.tuesdayThirdMealCalories} ккал
                </div>
              </div>
            </div>

            <div className={styles.MealPlans__row}>
              <div className={styles.MealPlans__firstColumn}>Wednesday</div>
              <div className={styles.MealPlans__secondColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.wednesdayFirstMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.wednesdayFirstMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__thirdColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.wednesdaySecondMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.wednesdaySecondMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__forthColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.wednesdayThirdMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.wednesdayThirdMealCalories} ккал
                </div>
              </div>
            </div>

            <div className={styles.MealPlans__row}>
              <div className={styles.MealPlans__firstColumn}>Thursday</div>
              <div className={styles.MealPlans__secondColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.thursdayFirstMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.thursdayFirstMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__thirdColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.thursdaySecondMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.thursdaySecondMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__forthColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.thursdayThirdMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.thursdayThirdMealCalories} ккал
                </div>
              </div>
            </div>

            <div className={styles.MealPlans__row}>
              <div className={styles.MealPlans__firstColumn}>Friday</div>
              <div className={styles.MealPlans__secondColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.fridayFirstMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.fridayFirstMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__thirdColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.fridaySecondMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.fridaySecondMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__forthColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.fridayThirdMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.fridayThirdMealCalories} ккал
                </div>
              </div>
            </div>

            <div className={styles.MealPlans__row}>
              <div className={styles.MealPlans__firstColumn}>Saturday</div>
              <div className={styles.MealPlans__secondColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.saturdayFirstMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.saturdayFirstMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__thirdColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.saturdaySecondMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.saturdaySecondMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__forthColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.saturdayThirdMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.saturdayThirdMealCalories} ккал
                </div>
              </div>
            </div>

            <div className={styles.MealPlans__row}>
              <div className={styles.MealPlans__firstColumn}>Sunday</div>
              <div className={styles.MealPlans__secondColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.sundayFirstMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.sundayFirstMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__thirdColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.sundaySecondMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.sundaySecondMealCalories} ккал
                </div>
              </div>
              <div className={styles.MealPlans__forthColumn}>
                <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
                <div className={styles.MealPlans__secondColumnMealName}>
                  {authUserInfo.sundayThirdMealName}
                </div>
                <div className={styles.MealPlans__secondColumnMealCalorie}>
                  {authUserInfo.sundayThirdMealCalories} ккал
                </div>
              </div>
            </div>
          </div>
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
