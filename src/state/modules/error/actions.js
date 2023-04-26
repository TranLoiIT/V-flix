import { createAction } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import types from './types';

const getErrors = createAction(types.GET_ERRORS);
const clearErrors = createAction(types.CLEAR_ERRORS);
const getErrorsSuccess = createAction(types.GET_ERRORS_SUCCESS);
const clearErrorsSuccess = createAction(types.CLEAR_ERRORS_SUCCESS);

const actions = {
  getErrors,
  clearErrors,
};

function* getErrorsSaga(action) {
  try {
    yield put(getErrorsSuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}

function* clearErrorsSaga() {
  try {
    yield put(clearErrorsSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* sagas() {
  yield takeEvery(types.GET_ERRORS, getErrorsSaga);
  yield takeEvery(types.CLEAR_ERRORS, clearErrorsSaga);
}

export default actions;
