import React, { ReactElement, useState } from 'react';
import * as Survey from 'survey-react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

import { sendQuestions } from 'app/store/planReducer';
import { selectAuthUserInfo } from 'app/store/authReducer';

import 'survey-react/survey.css';

import styles from './styles.module.scss';

export default function Questionnaire(): ReactElement {
  const dispatch = useDispatch();

  const authUserName = useSelector(selectAuthUserInfo).userName;

  const [userName, setUserName] = useState(authUserName);

  // const defaultThemeColors = Survey.StylesManager.ThemeColors();

  // const { t } = useTranslation();

  return (
    <div className={styles.Questionnaire__wrapper}>
      <Survey.Survey
        css={{
          root: styles.Questionnaire__root,
        }}
        json={{
          'logoPosition': 'right',
          'pages': [
            {
              'name': 'firstPage',
              'elements': [
                {
                  'type': 'radiogroup',
                  'name': 'firstQuestion',
                  'title': 'Какой суточный калораж считаете для себя оптимальным? (для справки: ВОЗ считает, что для взрослого мужчины - 2100 до 4200 ккал, а для женщины — от 1800 до 3050 ккал в зависимости от нагрузки целей)',
                  'choices': [
                    {
                      'value': '1000',
                      'text': ' до 1000 (дефицит 1000)',
                    },
                    {
                      'value': '1500',
                      'text': ' до 1500 (дефицит 500)',
                    },
                    {
                      'value': '2000',
                      'text': ' 2000-3000 (норма - поддержание формы)',
                    },
                    {
                      'value': '3000',
                      'text': ' > 3000 (набор массы)',
                    },
                  ],
                },
              ],
            },
            {
              'name': 'secondPage',
              'elements': [
                {
                  'type': 'radiogroup',
                  'name': 'secondQuestion',
                  'title': 'Для чего Вам необходимы планы тренировок и питания',
                  'choices': [
                    {
                      'value': 'less',
                      'text': ' Хочу похудеть',
                    },
                    {
                      'value': 'nothing',
                      'text': ' Хочу поддерживать форму и чувствовать себя хорошо',
                    },
                    {
                      'value': 'more',
                      'text': ' Хочу набрать',
                    },
                    {
                      'value': 'fitness',
                      'text': ' Хочу подсушиться (прим: возможет набор веса, но уменьшение параметров и появление рельефа)',
                    },
                  ],
                },
              ],
            },
            {
              'name': 'thirdPage',
              'elements': [
                {
                  'type': 'radiogroup',
                  'name': 'thirdQuestion',
                  'title': 'За какое время желали бы достичь поставленной цели? (для справки: нормой считается потеря веса 3-4кг за месяц без ущерба для здоровья - цифра может варьироваться в зависимости от текущего показателя ИМТ)',
                  'choices': [
                    {
                      'value': '1',
                      'text': ' < месяца',
                    },
                    {
                      'value': '3',
                      'text': ' в течение 3 месяцев',
                    },
                    {
                      'value': '6',
                      'text': ' в течение полугода',
                    },
                    {
                      'value': '12',
                      'text': ' за год',
                    },
                  ],
                },
              ],
            },
          ],
        }}
        onComplete={(survey: any) => {
          setUserName(authUserName);
          dispatch(sendQuestions(survey.data, userName));
        }}
      />
    </div>
  );
}
