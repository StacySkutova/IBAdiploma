import { ReactElement } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useTranslation } from 'react-i18next';

import LanguagesListDropdownIconSVG from '../../svgs/LanguagesListDropdownIconSVG';

import styles from './styles.module.scss';

export default function LanguageSelector(): ReactElement {

  const { i18n } = useTranslation();

  return (
    <div className={styles.LanguageSelector__languagesWrapper}>
      <ReactFlagsSelect
        className={styles.LanguageSelector__languages}
        selected={i18n.language.toUpperCase() === 'RU' ? 'RU' : i18n.language.toUpperCase()}
        onSelect={(languageCode) => i18n.changeLanguage(languageCode.toLowerCase())}
        countries={['RU', 'US']}
        customLabels={{ RU: 'RU', US: 'EN' }}
      />
      <LanguagesListDropdownIconSVG
        className={styles.LanguageSelector__languagesListDropdownIcon}
      />
    </div>
  );
}
