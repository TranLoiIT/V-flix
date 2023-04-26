import { getCategoriesApi } from 'apis/categoryApi';
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import types from './types';

//= =============== ACTIONS ===============//
// Action Load Admin
const getCategories = createAction(types.GET_CATEGORIES);
const getCategoriesStart = createAction(types.GET_CATEGORIES_START);
const getCategoriesStop = createAction(types.GET_CATEGORIES_STOP);
const getCategoriesSuccess = createAction(types.GET_CATEGORIES_SUCCESS);
const getCategoriesFail = createAction(types.GET_CATEGORIES_FAIL);

// EXPORT ACTION
export const actions = {
  getCategories,
};

//= =============== SAGAS ===============//
function* getCategoriesSaga() {
  try {
    yield put(getCategoriesStart());
    const res = yield call(getCategoriesApi);
    yield put(getCategoriesSuccess(res.data));
    yield put(getCategoriesStop());
  } catch (err) {
    yield put(getCategoriesFail());
  }
}

export function* sagas() {
  yield takeEvery(types.GET_CATEGORIES, getCategoriesSaga);
}
