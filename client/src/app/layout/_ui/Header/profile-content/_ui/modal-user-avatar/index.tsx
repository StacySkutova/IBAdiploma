import { ReactElement, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { IconButton } from '@mui/material';
import axios from 'axios';
// import { useTranslation } from 'react-i18next';

import { selectAuthUserInfo } from 'app/store/authReducer';
import { AvatarUploadIconSVG } from 'shared/svgs';

import styles from './styles.module.scss';

export default function ModalUserAvatar({ modalActiveNew, setModalActiveNew }): ReactElement {
  // const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const authUserInfo = useSelector(selectAuthUserInfo);

  const [img, setImg] = useState(null);
  const [avatarUpload, setAvatarUpload] = useState(null);

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data.append('avatar', img);
      await axios.post('http://localhost:5000/upload-avatar', data).then((res) => {
        // dispatch(setAuthUserInfo({ avatar: res.data }));
        setAvatarUpload(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [img]);

  // const { t } = useTranslation();

  return (
    <div
      className={cn([
        styles.ModalUserProfile__wrapper,
        { [styles.ModalUserProfile__wrapperActiveStatus]: modalActiveNew === true },
      ])}
      onClick={() => setModalActiveNew(false)}
    >
      <div className={styles.ModalUserProfile__content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ModalUserProfile__greatingPhrase}>Upload avatar</div>
        <div className={styles.ModalUserProfile__inputsBlock}>
          <div className={styles.ModalUserProfile__avatarBlock}>
            <div className={styles.ModalUserProfile__avatarPicture}>
              {avatarUpload ? (
                <img
                  className={styles.ModalUserProfile__avatarUpload}
                  src={`${avatarUpload}`}
                  alt="avatar"
                />
              ) : (
                <div className={styles.ModalUserProfile__avatar}>{authUserInfo.userName[0]}</div>
              )}
            </div>
            <div className={styles.ModalUserProfile__avatarInputsBlock}>
              <input
                className={styles.ModalUserProfile__inputFileOldButton}
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (!e.target.files) return;
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setImg(e.target.files[0]);
                }}
              />
              <div className={styles.ModalUserProfile__inputFileNewButton}>
                <IconButton
                  onClick={() =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    fileInputRef.current.click()
                  }
                >
                  <AvatarUploadIconSVG />
                </IconButton>
              </div>
              <button
                type="button"
                className={styles.ModalUserProfile__submitButton}
                onClick={sendFile}
              >
                Обновить аватар
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
