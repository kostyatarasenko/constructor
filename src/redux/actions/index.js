import { createAction } from '@reduxjs/toolkit';

import {
  GET_COURSES,
  CREATE_COURSE,
  DELETE_COURSE,
  DUPLICATE_COURSE,
} from '@types/courses';

import {
  GET_LESSONS,
  CREATE_LESSON,
  DELETE_LESSON,
  DUPLICATE_LESSON,
} from '@types/lessons';

const getCourses = createAction(GET_COURSES);
const createCourse = createAction(CREATE_COURSE);
const deleteCourse = createAction(DELETE_COURSE);
const duplicateCourse = createAction(DUPLICATE_COURSE);

const getLessons = createAction(GET_LESSONS);
const createLesson = createAction(CREATE_LESSON);
const deleteLesson = createAction(DELETE_LESSON);
const duplicateLesson = createAction(DUPLICATE_LESSON);

export {
  createCourse,
  getCourses,
  deleteCourse,
  duplicateCourse,
  getLessons,
  createLesson,
  deleteLesson,
  duplicateLesson,
};
