import React, { useEffect, useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragCard from '@components/common/DragCard';
import Constructor from '@components/common/Constructor';
import PagesController from '@components/common/PagesController';
import { getConstructor, createConstructor, resetConstructor } from '@actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import atextIcon from '@assets/icons/atext.svg';
import globe from '@assets/icons/globe.svg';
import image from '@assets/icons/image.svg';
import link from '@assets/icons/link.svg';
import music from '@assets/icons/music.svg';
import text from '@assets/icons/text.svg';
import video from '@assets/icons/video.svg';
import test from '@assets/icons/test.svg';
import exercise from '@assets/icons/exercise.svg';

import lessona from '@assets/images/blocks/lesson.svg';
import home from '@assets/images/blocks/home.svg';
import more from '@assets/images/blocks/more.svg';
import { useGoogleLogin } from 'react-google-login';
import Navbar from '@components/Navbar';
import { useHistory } from 'react-router-dom';
import construct from '@babel/runtime/helpers/esm/construct';

function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}

const Lesson = () => {
  const { push } = useHistory();
  const actions = [{
    type: 'action-editor',
    name: 'Заголовок',
    icon: atextIcon,
  }, {
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
    type: 'exercise',
    name: 'Упражнение',
    icon: exercise,
  }, {
    type: 'test',
    name: 'Тест',
    icon: test,
  }, {
    type: 'vocabulary',
    name: 'Словарь',
    icon: globe,
  }];

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setPending(true);
    dispatch(getConstructor(params));
  }, [dispatch]);

  const { currentCourse, lesson } = useSelector((store) => store.lesson);

  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (lesson) {
      setPages(lesson.constructor);
      setCurrentPage(lesson.constructor[lesson.constructor.length - 1].id);
      setPending(false);
    }
  }, [lesson, currentCourse]);

  useEffect(() => {
    if (pages) {
      dispatch(createConstructor({ ...params, constructor: pages }));
    }
  }, [pages, dispatch, pending]);

  useEffect(() => () => {
    dispatch(resetConstructor());
  }, []);

  return (
    <>
      {
        pages && !pending ? (
          <DndProvider backend={HTML5Backend}>
            <Navbar
              title={currentCourse ? currentCourse.name : ''}
              value={pages[currentPage].name}
              middleText
              onChangeText={(e) => {
                setPages(pages.map((page) => {
                  if (page.id !== currentPage) {
                    return page;
                  } else {
                    return {
                      ...page,
                      name: e.target.value,
                    };
                  }
                }));
              }}
              goBack={() => push(`/course/${params.courseId}`)}
            />
            <div style={{ padding: '15px 0 15px 15px' }} id="lesson">
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
              <Constructor
                pageIndex={currentPage}
                pageState={pages[currentPage].pageState}
                onStateChange={(pageState, pageIndex) => {
                  setPages((prevState) => (prevState.map((page, index) => {
                    if (index !== pageIndex) {
                      return page;
                    } else {
                      return {
                        name: page.name,
                        id: page.id,
                        pageState,
                      };
                    }
                  })));
                }}
              />
              <aside id="additional-actions">
                <img src={lessona} style={{ marginBottom: 15, marginTop: 15 }} alt=""/>
                <img src={home} style={{ marginBottom: 15 }} alt=""/>
                <img src={more} style={{ marginBottom: 15 }} alt=""/>
              </aside>
            </div>
            <PagesController
              pages={pages}
              onCreatePage={() => {
                setPages((prevState) => ([...prevState, {
                  id: prevState[prevState.length - 1].id + 1,
                  name: 'Название страницы',
                  pageState: [],
                }]));
                setCurrentPage(currentPage + 1);
              }}
            />
          </DndProvider>
        ) : null
      }
    </>
  );
};

export default Lesson;
