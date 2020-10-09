import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getAccessToken } from '../../redux/api/googleDrive';

import DragCard from '@components/common/DragCard';
import Constructor from '@components/common/Constructor';

import atextIcon from '@assets/icons/atext.svg';
import globe from '@assets/icons/globe.svg';
import image from '@assets/icons/image.svg';
import link from '@assets/icons/link.svg';
import list from '@assets/icons/list.svg';
import music from '@assets/icons/music.svg';
import pencil from '@assets/icons/pencil-edit.svg';
import text from '@assets/icons/text.svg';
import video from '@assets/icons/video.svg';
import { useGoogleLogin } from 'react-google-login';

const Lesson = () => {
  const actions = [{
    type: 'action-editor',
    name: 'Заголовок',
    icon: atextIcon,
  },{
    type: 'editor',
    name: 'Текст',
    icon: text,
  }, {
    type: 'link',
    name: 'Ссылка',
    icon: link,
  }, {
    type: 'image',
    name: 'Картинка',
    icon: image,
  }, {
    type: 'video',
    name: 'Видео',
    icon: video,
  }, {
    type: 'audio',
    name: 'Аудио',
    icon: music,
  }, {
    type: 'vocabulary',
    name: 'Словарь',
    icon: globe,
  }];

  const { signIn, loaded } = useGoogleLogin({
    clientId: '968636488645-6t0vu8rc5abru6invstajqhog7rfb134.apps.googleusercontent.com',
    responseType: 'code',
    scope: 'https://www.googleapis.com/auth/drive',
    prompt: 'consent',
    accessType: 'offline',
    onSuccess: (response) => getAccessToken(response.code).then((data) => {
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('folders', JSON.stringify(data.folders));
    }).catch((e) => {

    }),
    onFailure: (response) => console.log(response),
  });

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      signIn();
    }
  }, [signIn, loaded]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="lesson">
        <aside id="actions">
          {
            actions.map(({ type, name, icon }) => (
              <DragCard
                key={type}
                type={type}
                name={name}
                icon={icon}
              />
            ))
          }
        </aside>
        <Constructor />
        <aside id="additional-actions">
          Lorem
        </aside>
      </div>
    </DndProvider>
  );
};

export default Lesson;
