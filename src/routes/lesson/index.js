import React, { useEffect, useState, memo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragCard from '@components/common/DragCard';
import Constructor from '@components/common/Constructor';
import PagesController from '@components/common/PagesController';
import { getConstructor, createConstructor } from '@actions';
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
    dispatch(getConstructor(params));
  }, []);

  const [pending, setPending] = useState(true);
  const { currentCourse, lesson } = useSelector((store) => store.lesson);
  console.log(currentCourse, lesson);

  const [pages, setPages] = useState(lesson && lesson.constructor.length ? lesson.constructor : [{
    id: 0,
    name: 'Название страницы',
    pageState: [],
  }]);
  const [currentPage, setCurrentPage] = useState(lesson && lesson.constructor.length ? lesson.constructor[lesson.constructor.length - 1].id : 0);

  useEffect(() => {
    if (!pending) {
      dispatch(createConstructor({ ...params, constructor: pages }));
    }
  }, [pages, pending]);

  useEffect(() => {
    if (currentCourse && lesson) {
      setPending(false);
    }
  }, [currentCourse, lesson]);

  return (
    <>
      {
        lesson && lesson.constructor.length ? (
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
