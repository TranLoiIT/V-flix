import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import types from './types';

const isAuthenticated = (state) => state.getIn(['user', 'isAuthenticated']);
const isLoading = (state) => state.getIn(['user', 'isLoading']);
const user = (state) => state.getIn(['user', 'user']);

export const selectors = {
  isAuthenticated,
  isLoading,
  user,
};

const initialState = fromJS({
  isAuthenticated: null,
  isLoading: false,
  user: null,
});

const loading = (state) => state.set('isLoading', true);
const update = (state, action) =>
  state.set('user', fromJS(action.payload)).set('isLoading', false);
const success = (state, action) =>
  state
    .set('isAuthenticated', true)
    .set('isLoading', false)
    .set('user', fromJS(action.payload));
const fail = (state) =>
  state.set('isAuthenticated', false).set('isLoading', false).set('user', null);

const reducer = handleActions(
  {
    [types.USER_LOADING]: loading,
    [types.USER_LOADED]: success,
    [types.LOGIN_SUCCESS]: success,
    [types.REGISTER_SUCCESS]: success,
    [types.LOGIN_FAIL]: fail,
    [types.REGISTER_FAIL]: fail,
    [types.AUTH_ERROR]: fail,
    [types.LOGOUT_SUCCESS]: fail,
    [types.UPDATE_USER_SUCCESS]: update,
  },
  initialState,
);

export default reducer;
