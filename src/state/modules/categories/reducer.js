const { fromJS } = require('immutable');
const { handleActions } = require('redux-actions');
const { default: types } = require('./types');

const categories = (state) => state.getIn(['category', 'categories']);
const loading = (state) => state.getIn(['category', 'loading']);

export const selectors = {
  categories,
  loading,
};

const initialState = fromJS({
  categories: [],
  loading: true,
});

const start = (state) => state.set('loading', true);
const stop = (state) => state.set('loading', false);
const success = (state, action) =>
  state.set('categories', fromJS(action.payload));
const fail = (state) => state.set('categories', []);

const reducer = handleActions(
  {
    [types.GET_CATEGORIES_START]: start,
    [types.GET_CATEGORIES_STOP]: stop,
    [types.GET_CATEGORIES_SUCCESS]: success,
    [types.GET_CATEGORIES_FAIL]: fail,
  },
  initialState,
);

export default reducer;
