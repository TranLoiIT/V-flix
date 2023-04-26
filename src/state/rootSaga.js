import { all } from 'redux-saga/effects';
import { adminSagas } from './modules/admin';
import { categoriesSagas } from './modules/categories';
import { errorSagas } from './modules/error';
import { userSagas } from './modules/user';

export default function* rootSaga() {
  yield all([adminSagas(), errorSagas(), userSagas(), categoriesSagas()]);
}
