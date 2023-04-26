const { fromJS } = require('immutable');
const { handleActions } = require('redux-actions');
const { default: types } = require('./types');

const msg = (state) => state.getIn(['error', 'msg']);
const status = (state) => state.getIn(['error', 'status']);
const id = (state) => state.getIn(['error', 'id']);
const error = (state) => state.get('error').toJS();

export const selectors = {
  msg,
  status,
  id,
  error,
};

const initialState = fromJS({
  msg: {},
  status: null,
  id: null,
});

const getErrorsSuccess = (state, action) => {
  return state
    .set('msg', fromJS(action.payload.msg))
    .set('status', action.payload.status)
    .set('id', action.payload.id);
};
const clearErrorsSuccess = (state) =>
  state.set('msg', {}).set('status', null).set('id', null);

const reducer = handleActions(
  {
    [types.GET_ERRORS_SUCCESS]: getErrorsSuccess,
    [types.CLEAR_ERRORS_SUCCESS]: clearErrorsSuccess,
  },
  initialState,
);

export default reducer;
