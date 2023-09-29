import {
  authUserApi,
  changePwUserApi,
  getUserApi,
  loginFacebookApi,
  loginGoogleApi,
  logoutUserApi,
  registerApi,
  updateUserApi,
} from 'apis/userApi';
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import types from './types';
import { CONSTANTS } from 'utils/common';

const { errorActions } = require('../error');

const { getErrors, clearErrors } = errorActions;

//= =============== ACTIONS ===============//
// Action Load User
const loadUser = createAction(types.LOAD_USER);
const userLoading = createAction(types.USER_LOADING);
const userLoaded = createAction(types.USER_LOADED);
const authError = createAction(types.AUTH_ERROR);

// Action Login
const login = createAction(types.LOGIN);
const loginGoogle = createAction(types.LOGIN_GOOGLE);
const loginFacebook = createAction(types.LOGIN_FACEBOOK);
const loginSuccess = createAction(types.LOGIN_SUCCESS);
const loginFail = createAction(types.LOGIN_FAIL);

// Action Register
const register = createAction(types.REGISTER);
const registerSuccess = createAction(types.REGISTER_SUCCESS);
const registerFail = createAction(types.REGISTER_FAIL);

// Action Logout
const logout = createAction(types.LOGOUT);
const logoutSuccess = createAction(types.LOGOUT_SUCCESS);

// Action Update
const updateUser = createAction(types.UPDATE_USER);
const updateUserSuccess = createAction(types.UPDATE_USER_SUCCESS);

// Action Change Password
const changePasswordUser = createAction(types.CHANGE_PASSWORD);

// EXPORT ACTION
export const actions = {
  loadUser,
  login,
  loginGoogle,
  loginFacebook,
  register,
  logout,
  updateUser,
  changePasswordUser,
};

//= =============== SAGAS ===============//
function* loadUserSaga() {
  try {
    yield put(userLoading());
    const res = yield call(getUserApi);
    yield put(userLoaded(res.data));
  } catch (err) {
    yield put(
      getErrors({
        msg: err?.response?.data || '',
        status: err?.response?.status || '',
        id: null,
      }),
    );
    yield put(authError());
  }
}

function* loginSaga(action) {
  try {
    const res = yield call(authUserApi, action.payload);
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN, res.token);
    localStorage.setItem(CONSTANTS.TYPE, 'user');
    yield put(loginSuccess(res.data));
    yield put(clearErrors());
  } catch (err) {
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

function* loginGoogleSaga(action) {
  try {
    console.log('action.payload', action.payload);
    const res = yield call(loginGoogleApi, action.payload);
    yield put(loginSuccess(res.data));
    yield put(clearErrors());
  } catch (err) {
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

function* loginFacebookSaga(action) {
  try {
    const res = yield call(
      loginFacebookApi,
      action.payload.accessToken,
      action.payload.userID,
    );
    yield put(loginSuccess(res.data));
    yield put(clearErrors());
  } catch (err) {
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

function* registerSaga(action) {
  try {
    const res = yield call(registerApi, action.payload);
    yield put(registerSuccess(res.data));
    yield put(clearErrors());
  } catch (err) {
    yield put(
      getErrors({
        msg: err.response.data,
        status: err.response.status,
        id: 'REGISTER_FAIL',
      }),
    );
    yield put(registerFail());
  }
}

function* logoutSaga() {
  try {
    yield call(logoutUserApi);
    localStorage.removeItem(CONSTANTS.ACCESS_TOKEN)
    yield put(logoutSuccess());
  } catch (err) {
    console.log(err);
  }
}

function* updateUserSaga(action) {
  try {
    yield put(userLoading());
    const { id, dataUser } = action.payload;
    const res = yield call(updateUserApi, id, dataUser);
    yield put(updateUserSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, dataPassword } = action.payload;
    yield call(changePwUserApi, id, dataPassword);
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
  yield takeEvery(types.LOAD_USER, loadUserSaga);
  yield takeEvery(types.LOGIN, loginSaga);
  yield takeEvery(types.LOGIN_GOOGLE, loginGoogleSaga);
  yield takeEvery(types.LOGIN_FACEBOOK, loginFacebookSaga);
  yield takeEvery(types.REGISTER, registerSaga);
  yield takeEvery(types.LOGOUT, logoutSaga);
  yield takeEvery(types.UPDATE_USER, updateUserSaga);
  yield takeEvery(types.CHANGE_PASSWORD, changePasswordSaga);
}
