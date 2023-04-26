const { fromJS } = require('immutable');
const { handleActions } = require('redux-actions');
const { default: types } = require('./types');

const isAuthenticated = (state) => state.getIn(['admin', 'isAuthenticated']);
const isLoading = (state) => state.getIn(['admin', 'isLoading']);
const admin = (state) => state.getIn(['admin', 'admin']);

export const selectors = {
  isAuthenticated,
  isLoading,
  admin,
};

const initialState = fromJS({
  isAuthenticated: null,
  isLoading: false,
  admin: null,
});

const loading = (state) => state.set('isLoading', true);
const success = (state, action) =>
  state
    .set('isAuthenticated', true)
    .set('isLoading', false)
    .set('admin', fromJS(action.payload));
const fail = (state) =>
  state
    .set('isAuthenticated', false)
    .set('isLoading', false)
    .set('admin', null);

const reducer = handleActions(
  {
    [types.ADMIN_LOADING]: loading,
    [types.ADMIN_LOADED]: success,
    [types.LOGIN_SUCCESS]: success,
    [types.UPDATE_ADMIN_SUCCESS]: success,
    [types.LOGIN_FAIL]: fail,
    [types.AUTH_ERROR]: fail,
    [types.LOGOUT_SUCCESS]: fail,
  },
  initialState,
);

export default reducer;
