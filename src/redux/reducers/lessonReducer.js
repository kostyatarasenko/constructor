import { createReducer } from '@reduxjs/toolkit';

import {
  GET_LESSON_FULFILLED,
  GET_LESSON_REJECTED,
} from '@types/lesson';

const lessonReducer = createReducer({
  lesson: [],
  currentCourse: null,
  error: null,
}, {
  [GET_LESSON_FULFILLED]: (state, { payload: { lesson, currentCourse } }) => ({
    ...state,
    lesson,
    currentCourse,
    error: null,
  }),
  [GET_LESSON_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});

export default lessonReducer;
