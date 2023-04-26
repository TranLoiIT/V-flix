import { actions, sagas } from './actions';
import reducer, { selectors } from './reducer';
import types from './types';

export default reducer;

export {
  types as adminTypes,
  sagas as adminSagas,
  actions as adminActions,
  selectors as adminSelectors,
};
