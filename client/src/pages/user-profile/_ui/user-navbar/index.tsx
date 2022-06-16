import { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDataAsyncFromBackend } from 'app/store/userReducer';
import { HomePageIconSVG, WorkoutPlansIconSVG, MealPLansIconSVG } from 'shared/svgs';

import styles from './styles.module.scss';
import { selectAuthUserInfo } from '../../../../app/store/authReducer';

export default function UserNavbar(): ReactElement {
  const dispatch = useDispatch();

  const authUserName = useSelector(selectAuthUserInfo).userName;

  const [userName, setUserName] = useState(authUserName);

  const { t } = useTranslation();

  const determineIsActiveClassName = ({ isActive }): string =>
    isActive ? styles.Navbar__activeLinkItem : styles.Navbar__linkItem;

  return (
    <div className={styles.Navbar__wrapper}>
      <div className={styles.Navbar__container}>
        <NavLink to='home-page' className={determineIsActiveClassName}>
          <HomePageIconSVG fill='currentcolor' />
          <span className={styles.Navbar__linkText}>{t('home_page')}</span>
        </NavLink>
        <NavLink to='workout-plans' className={determineIsActiveClassName} onClick={() => {
          setUserName(authUserName);
          dispatch(getUserDataAsyncFromBackend(userName));
        }}>
          <WorkoutPlansIconSVG fill='currentcolor' />
          <span className={styles.Navbar__linkText}>{t('workout_plans')}</span>
        </NavLink>
        <NavLink to='meal-plans' className={determineIsActiveClassName}>
          <MealPLansIconSVG fill='currentcolor' />
          <span className={styles.Navbar__linkText}>{t('meal_plans')}</span>
        </NavLink>
        <NavLink to='questionnaire' className={styles.Navbar__questionnaireButton}>
          {t('questionnaire')}
        </NavLink>
      </div>
    </div>
  );
}
