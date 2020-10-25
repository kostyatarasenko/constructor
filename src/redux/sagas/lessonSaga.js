import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';

import {
  GET_LESSON,
  GET_LESSON_FULFILLED,
  GET_LESSON_REJECTED,
} from '@types/lesson';

import firebase from '@app-config/firebase';

const { firestore } = firebase;

function* getLesson({ payload: { courseId, lessonId } }) {
  try {
    const course = yield call(firestore.getDocument, `courses/${courseId}`);
    console.log(course.data().lessons);
    console.log(course.data().lessons.find(({ id }) => id === lessonId));
    yield put({
      type: GET_LESSON_FULFILLED,
      payload: {
        currentCourse: course.data(),
        lesson: course.data().lessons.find(({ id }) => id === lessonId)
      },
    });
  } catch (error) {
    yield put({
      type: GET_LESSON_REJECTED,
      payload: error,
    });
  }
}

function* watchGetLesson() {
  yield takeEvery(GET_LESSON, getLesson);
}

export default [
  watchGetLesson(),
];
