import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';

import {
  CREATE_CONSTRUCTOR,
  GET_CONSTRUCTOR,
  GET_CONSTRUCTOR_FULFILLED,
  GET_CONSTRUCTOR_REJECTED,
} from '@types/lesson';

import firebase from '@app-config/firebase';

const { firestore } = firebase;

function* getLesson({ payload: { courseId, lessonId } }) {
  try {
    const course = yield call(firestore.getDocument, `courses/${courseId}`);
    yield put({
      type: GET_CONSTRUCTOR_FULFILLED,
      payload: {
        currentCourse: course.data(),
        lesson: course.data().lessons.find(({ id }) => id === +lessonId)
      },
    });
  } catch (error) {
    yield put({
      type: GET_CONSTRUCTOR_REJECTED,
      payload: error,
    });
  }
}

function* createLesson({ payload: { courseId, lessonId, constructor } }) {
  try {
    const courseSnapshot = yield call(firestore.getDocument, `courses/${courseId}`);
    const course = courseSnapshot.data();
    const updatedCourse = {
      ...course,
      lessons: course.lessons.map((lessona) => {
        if (lessona.id !== +lessonId) {
          return lessona;
        } else {
          return {
            ...lessona,
            constructor,
          };
        }
      })
    };
    // debugger;
    yield call(firestore.setDocument, `courses/${courseId}`, updatedCourse);
  } catch (error) {
    // yield put({
    //   type: GET_LESSON_REJECTED,
    //   payload: error,
    // });
  }
}

function* watchGetLesson() {
  yield takeEvery(GET_CONSTRUCTOR, getLesson);
}

function* watchCreateLesson() {
  yield takeEvery(CREATE_CONSTRUCTOR, createLesson);
}

export default [
  watchGetLesson(),
  watchCreateLesson(),
];
