import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import UserNavbar from './_ui/user-navbar';
import HomePage from './home-page';
import WorkoutPlans from './workout-plans';
import Questionnaire from './questionnaire';
import { MealPlans } from './meal-plans';

import styles from './styles.module.scss';

export default function UserProfilePage(): ReactElement {
  return (
    <div className={styles.UserProfilePage__pageWrapper}>
      <UserNavbar />
      <Routes>
        <Route path='home-page' element={<HomePage />} />
        <Route path='workout-plans' element={<WorkoutPlans />} />
        <Route path='meal-plans' element={<MealPlans />} />
        <Route path='questionnaire' element={<Questionnaire />} />
      </Routes>
    </div>
  );
}
