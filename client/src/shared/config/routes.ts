const AllRoutes = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_PROFILE: '/user-profile/*',
  ADMIN_PANEL: '/admin-panel/*',
  USER_PROFILE_WORKOUT: '/user-profile/workout-plans',
  USER_PROFILE_MEAL: '/user-profile/meal-plans',
  USER_PROFILE_PLAN: '/user-profile/questionnaire',
  NOT_FOUND: '/404',
};

export const PublicRoutes = [
  AllRoutes.HOME,
  AllRoutes.SIGN_IN,
  AllRoutes.SIGN_UP,
  AllRoutes.FORGOT_PASSWORD,
  AllRoutes.RESET_PASSWORD,
  AllRoutes.USER_PROFILE,
  AllRoutes.ADMIN_PANEL,
  AllRoutes.USER_PROFILE_WORKOUT,
  AllRoutes.USER_PROFILE_MEAL,
  AllRoutes.USER_PROFILE_PLAN,
  AllRoutes.NOT_FOUND,
];

export default AllRoutes;
