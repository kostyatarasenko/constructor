import { all } from 'redux-saga/effects';

import coursesSaga from './coursesSaga';
import courseSaga from './courseSaga';

export default function* rootSaga() {
  yield all([
    ...coursesSaga,
    ...courseSaga,
  ]);
}
