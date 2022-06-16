import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from 'react-flags-select';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';

import {
  selectIsSignOutLoading,
  selectAuthUserInfo,
  signOutByBackend,
} from 'app/store/authReducer';
import LanguagesListDropdownIconSVG from 'shared/svgs/LanguagesListDropdownIconSVG';
import ModalUserProfile from './_ui/modal-user-profile';

import styles from './styles.module.scss';

function ProfileContent(): ReactElement {
  const dispatch = useDispatch();

  const isSignOutLoading = useSelector(selectIsSignOutLoading);

  // TODO need to add information about user, take correct info
  //  about current logged in user
  const authUserInfo = useSelector((selectAuthUserInfo));

  const { t, i18n } = useTranslation();

  const [isDropdownOpend, setDropdownOpend] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const toggleDropDown = (): void => {
    setDropdownOpend(!isDropdownOpend);
  };

  const handleSignOut = (): void => {
    dispatch(signOutByBackend());
  };

  return (
    <div className={styles.ProfileContent__container}>
      <div className={styles.ProfileContent__authUserInfo}>
        <div className={styles.ProfileContent__userName}>
          <div className={styles.ProfileContent__userGreating}>
            {t('greating')}, {authUserInfo.userName || 'anonym'}!
          </div>
        </div>
        <IconButton onClick={toggleDropDown}>
          {console.log(authUserInfo.avatar)}
          {authUserInfo.avatar === '' ?
            <div className={styles.ProfileContent__userAvatar}>{authUserInfo.userName[0]}</div> :
            <img className={styles.ProfileContent__userAvatar} src={`${authUserInfo.avatar}`} alt='avatar' />}
          {isDropdownOpend ?
            (<div className={styles.ProfileContent__dropDownMenu}>
              <button type='button' onClick={() => {
                dispatch(setModalActive(true));
                console.log('new user info');
              } // берет authUser имя и пароль по ним ищет юзра и оновляет
              }
                      className={styles.ProfileContent__buttons}>
                Edit profile
              </button>
              <button type='button' onClick={handleSignOut} disabled={isSignOutLoading}
                      className={styles.ProfileContent__buttons}>
                Sign out
              </button>
            </div>) : false}
        </IconButton>
      </div>
      <div className={styles.ProfileContent__languagesWrapper}>
        <ReactFlagsSelect
          className={styles.ProfileContent__languages}
          selected={i18n.language.toUpperCase() === 'RU' ? 'RU' : i18n.language.toUpperCase()}
          onSelect={(languageCode) => i18n.changeLanguage(languageCode.toLowerCase())}
          countries={['RU', 'US']}
          customLabels={{ RU: 'RU', US: 'EN' }}
        />
        <LanguagesListDropdownIconSVG
          className={styles.ProfileContent__languagesListDropdownIcon}
        />
      </div>
      <ModalUserProfile
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
    </div>
  );
}

export default ProfileContent;
