import {
  authAdminApi,
  changePwAdminApi,
  getAdminApi,
  logoutAdminApi,
  updateAdminApi,
} from 'apis/adminApi';
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { errorActions } from '../error';
import types from './types';

const { getErrors, clearErrors } = errorActions;

//= =============== ACTIONS ===============//
// Action Load Admin
const loadAdmin = createAction(types.LOAD_ADMIN);
const adminLoading = createAction(types.ADMIN_LOADING);
const adminLoaded = createAction(types.ADMIN_LOADED);
const authError = createAction(types.AUTH_ERROR);

// Action Login
const login = createAction(types.LOGIN);
const loginSuccess = createAction(types.LOGIN_SUCCESS);
const loginFail = createAction(types.LOGIN_FAIL);

// Action Logout
const logout = createAction(types.LOGOUT);
const logoutSuccess = createAction(types.LOGOUT_SUCCESS);

// Update Admin
const updateAdmin = createAction(types.UPDATE_ADMIN);
const updateAdminSuccess = createAction(types.UPDATE_ADMIN_SUCCESS);

// Action Change Password
const changePasswordAdmin = createAction(types.CHANGE_PASSWORD);

// EXPORT ACTION
export const actions = {
  loadAdmin,
  login,
  logout,
  changePasswordAdmin,
  updateAdmin,
};

//= =============== SAGAS ===============//
function* loadAdminSaga() {
  try {
    yield put(adminLoading());
    const res = yield call(getAdminApi);
    yield put(adminLoaded(res.data));
  } catch (err) {
    yield put(
      getErrors({
        msg: err.response.data,
        status: err.response.status,
        id: null,
      }),
    );
    yield put(authError());
  }
}

function* loginSaga(action) {
  try {
    const res = yield call(authAdminApi, action.payload);
    yield put(loginSuccess(res.data));
    yield put(clearErrors());
  } catch (err) {
    console.log(err);
    yield put(
      getErrors({
        msg: err.response.data,
        status: err.response.status,
        id: 'LOGIN_FAIL',
      }),
    );
    yield put(loginFail());
  }
}

function* logoutSaga() {
  try {
    yield call(logoutAdminApi);
    yield put(logoutSuccess());
  } catch (err) {
    console.log(err);
  }
}

function* updateAdminSaga(action) {
  try {
    yield put(adminLoading());
    const res = yield call(updateAdminApi, action.payload);
    yield put(updateAdminSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* changePasswordSaga(action) {
  try {
    yield call(changePwAdminApi, action.payload);
    yield put(logout());
    yield put(clearErrors());
  } catch (err) {
    console.log(err);
    yield put(
      getErrors({
        msg: err.response.data,
        status: err.response.status,
        id: 'CHANGE_PASSWORD_FAIL',
      }),
    );
  }
}

export function* sagas() {
  yield takeEvery(types.LOAD_ADMIN, loadAdminSaga);
  yield takeEvery(types.LOGIN, loginSaga);
  yield takeEvery(types.LOGOUT, logoutSaga);
  yield takeEvery(types.UPDATE_ADMIN, updateAdminSaga);
  yield takeEvery(types.CHANGE_PASSWORD, changePasswordSaga);
}
