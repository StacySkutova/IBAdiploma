import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { selectUserData } from 'app/store/userReducer';

import styles from './styles.module.scss';

export function MealPlans(): ReactElement {
  const authUserInfo = useSelector(selectUserData);

  return (
    <div className={styles.MealPlans__wrapper}>
      <div className={styles.MealPlans__mealNumber}>Рекомендуемое количество приемов пищи в сутки: <span>{authUserInfo.perDayMealNumber}</span></div>
      <div className={styles.MealPlans__menuPerDayTable}>
        <div className={styles.MealPlans__row}>
          <div className={styles.MealPlans__firstColumn}>Monday</div>
          <div className={styles.MealPlans__secondColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.mondayFirstMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.mondayFirstMealCalories} ккал</div>
          </div>
          <div className={styles.MealPlans__thirdColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.mondaySecondMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.mondaySecondMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__forthColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.mondayThirdMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.mondayThirdMealCalories} ккал</div>
          </div>
        </div>

        <div className={styles.MealPlans__row}>
          <div className={styles.MealPlans__firstColumn}>Tuesday</div>
          <div className={styles.MealPlans__secondColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.tuesdayFirstMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.tuesdayFirstMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__thirdColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.tuesdaySecondMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.tuesdaySecondMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__forthColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.tuesdayThirdMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.tuesdayThirdMealCalories} ккал
            </div>
          </div>
        </div>

        <div className={styles.MealPlans__row}>
          <div className={styles.MealPlans__firstColumn}>Wednesday</div>
          <div className={styles.MealPlans__secondColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.wednesdayFirstMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.wednesdayFirstMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__thirdColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.wednesdaySecondMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.wednesdaySecondMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__forthColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.wednesdayThirdMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.wednesdayThirdMealCalories} ккал
            </div>
          </div>
        </div>

        <div className={styles.MealPlans__row}>
          <div className={styles.MealPlans__firstColumn}>Thursday</div>
          <div className={styles.MealPlans__secondColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.thursdayFirstMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.thursdayFirstMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__thirdColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.thursdaySecondMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.thursdaySecondMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__forthColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.thursdayThirdMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.thursdayThirdMealCalories} ккал
            </div>
          </div>
        </div>

        <div className={styles.MealPlans__row}>
          <div className={styles.MealPlans__firstColumn}>Friday</div>
          <div className={styles.MealPlans__secondColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.fridayFirstMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.fridayFirstMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__thirdColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.fridaySecondMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.fridaySecondMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__forthColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.fridayThirdMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.fridayThirdMealCalories} ккал
            </div>
          </div>
        </div>

        <div className={styles.MealPlans__row}>
          <div className={styles.MealPlans__firstColumn}>Saturday</div>
          <div className={styles.MealPlans__secondColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.saturdayFirstMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.saturdayFirstMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__thirdColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.saturdaySecondMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.saturdaySecondMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__forthColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.saturdayThirdMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.saturdayThirdMealCalories} ккал
            </div>
          </div>
        </div>

        <div className={styles.MealPlans__row}>
          <div className={styles.MealPlans__firstColumn}>Sunday</div>
          <div className={styles.MealPlans__secondColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Заврак</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.sundayFirstMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.sundayFirstMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__thirdColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Обед</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.sundaySecondMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.sundaySecondMealCalories} ккал
            </div>
          </div>
          <div className={styles.MealPlans__forthColumn}>
            <div className={styles.MealPlans__secondColumnTitle}>Ужин</div>
            <div className={styles.MealPlans__secondColumnMealName}>{authUserInfo.sundayThirdMealName}</div>
            <div className={styles.MealPlans__secondColumnMealCalorie}>{authUserInfo.sundayThirdMealCalories} ккал
            </div>
          </div>
        </div>

        {/* {isRunsDataLoading && ( */}
        {/*  <div className={styles.RunsTable__tableLoading}> */}
        {/*    <CircularProgress /> */}
        {/*  </div> */}
        {/* )} */}
      </div>
    </div>
  );
}
