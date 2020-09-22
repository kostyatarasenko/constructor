import { combineReducers } from 'redux';

import coursesReducer from './coursesReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  courses: coursesReducer,
  course: courseReducer,
});

export default rootReducer;
