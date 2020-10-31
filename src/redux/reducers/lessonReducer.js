import { createReducer } from '@reduxjs/toolkit';

import {
  GET_CONSTRUCTOR_FULFILLED,
  GET_CONSTRUCTOR_REJECTED,
  RESET_CONSTRUCTOR,
} from '@types/lesson';

const lessonReducer = createReducer({
  lesson: null,
  currentCourse: null,
  error: null,
}, {
  [GET_CONSTRUCTOR_FULFILLED]: (state, { payload: { lesson, currentCourse } }) => ({
    ...state,
    lesson,
    currentCourse,
    error: null,
  }),
  [GET_CONSTRUCTOR_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [RESET_CONSTRUCTOR]: (state) => ({
    ...state,
    lesson: null,
    currentCourse: null,
    error: null,
  })
});

export default lessonReducer;
