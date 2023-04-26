import actions, { sagas } from './actions';
import reducer, { selectors } from './reducer';
import types from './types';

export default reducer;

export {
  types as errorTypes,
  actions as errorActions,
  selectors as errorSelectors,
  sagas as errorSagas,
};
