import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

import { selectAuthUserInfo } from 'app/store/authReducer';
import workoutJPG from 'shared/jpgs/WorkoutInfo.jpg';
import mealInfoJPG from 'shared/jpgs/MealInfo.jpg';
import PlanJPG from 'shared/jpgs/Plan.jpg';
import AllRoutes from 'shared/config/routes';

import styles from './styles.module.scss';

export default function HomePage(): ReactElement {
  const authUserInfo = useSelector(selectAuthUserInfo);

  // const { t } = useTranslation();

  return (
    <div className={styles.HomePage__wrapper}>
      <div className={styles.HomePage__mainGreating}>
        Добро пожаловать в
        <span className={styles.HomePage__logo}>
          Health
          <span>&</span>
          <span>Fitness</span>
        </span>
        App!
      </div>
      <div className={styles.HomePage__textBlock}>
        <div className={styles.HomePage__textUserGreating}>
          Рады приветствовать, <span>{authUserInfo.userName || 'anonym'}</span>! Теперь Вы являетесь
          членом одной огромной семьи, в приоритете у которой ЗОЖ в широком понимании этого слова.
          Мы постарались и продолжаем стараться делать все, что в наших силах, чтобы Вы нашли данное
          приложение максимально полезным для себя, а качество Вашей жизни улучшилось в разы. Здесь
          вы можете подобрать полный комплекс того, что необходимо для здоровой, полноценной и
          долгой жизни только в удовольствие.
        </div>
        <div className={styles.HomePage__workoutInfo}>
          <div className={styles.HomePage__workoutInfoText}>
            Мы не откроем секрета, что неотъемлимой частью полноценной и здоровой жизни являются
            регулярные и правильно подобранные тренировки. Мы тщательно проанализировли самые
            популярные цели самые эффетивные упражненя (виды, количество подходов, регулярнось
            занятий и т.д.), чтобы корректно сформулиовать вопросы, позволяющие максимално точно
            подобрать Ваш личный план тенировок. Кроме всего прочего, немаловажно находит баланс
            между выбираемой нарузкой и располагаемыми физиескими силам и здоровьем. Вы можете
            приступить к сставлению плана тренировок уже прямо сейчас пройдя
            <Link to={AllRoutes.USER_PROFILE_PLAN} className={styles.HomePage__links} replace>
              {' '}
              данный опрос
            </Link>
            .
          </div>
          <img src={workoutJPG} className={styles.HomePage__workoutInfoImg} alt="Workout" />
        </div>
        <div className={styles.HomePage__mealInfo}>
          <img src={mealInfoJPG} className={styles.HomePage__mealInfoImg} alt="Workout" />
          <div className={styles.HomePage__mealInfoText}>
            Однако, как бы не были хороши тренировки, толко они не могут дать стопроцентный
            резльтат. Ведь можно изнурять себя многочасовыми тренирвками, но при этом питаться
            фаст-фудом. По итогу 0, а порой и ещ болший вред своему здоровью. В доолнене стот
            отетть, что для любитлей рельефной мускулатуры питание, поалуй, даже стои поставить на
            первое место, т.к. тренирвки лишь убирают объемы чаще всего за счет потери в первую
            очередь воды, но не ускоряют рост мышечной массы и не улучшают упругость кожи. Но
            необходимо во все знать меру, инче с трдом потеянны киллораммы оень быстро вернуться еще
            с &laquo;друзями&raquo;. Чтобы узнат свою меру, неоходмо пройти
            <Link to={AllRoutes.USER_PROFILE_PLAN} className={styles.HomePage__links}>
              {' '}
              данный опрос
            </Link>
            .
          </div>
        </div>
        <div className={styles.HomePage__questionnaireInfo}>
          <div className={styles.HomePage__questionnaireText}>
            Подводя итог, хотелось бы отметить, что мы очень постаралсь сздаь 2в1, чтобы масимально
            приблизить желаемое к реальности, не отбрасывая в сторону возожное. Созданый нами
            комплесный
            <Link to={AllRoutes.USER_PROFILE_PLAN} className={styles.HomePage__links}>
              {' '}
              опросник{' '}
            </Link>
            поволит сразу подобрать и нужный план тренировок, и совместимый с ним план питания для
            достижения всех Ваших целей. При прохождении
            <Link to={AllRoutes.USER_PROFILE_PLAN} className={styles.HomePage__links}>
              {' '}
              опроснка{' '}
            </Link>
            старйтеь отвечать честно, но и сильно не анализируя и здумываясь. После заверения
            прохождения
            <Link to={AllRoutes.USER_PROFILE_WORKOUT} className={styles.HomePage__links}>
              {' '}
              план тренирвок{' '}
            </Link>{' '}
            и
            <Link to={AllRoutes.USER_PROFILE_MEAL} className={styles.HomePage__links}>
              {' '}
              план пиания{' '}
            </Link>
            отобрзятся у Вас в сооветствующих папках слева в авигацинной панели.
          </div>
          <img src={PlanJPG} className={styles.HomePage__questionnaireImg} alt="Plan" />
        </div>
        <div className={styles.HomePage__lastWords}>
          Мы очень надемся что Вы останетесь довольны данным приложением, будете им пользоваться
          регулярнои совтовать воим друзьям и знакомым
        </div>
        <div className={styles.HomePage__signature}>
          <div>С уважением,</div>
          <div className={styles.HomePage__teamPhrase}>
            Ваша команда
            <span className={styles.HomePage__logoText}>
              Health
              <span>&</span>
              <span>Fitness</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
