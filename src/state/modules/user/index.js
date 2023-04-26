import { actions, sagas } from './actions';
import reducer, { selectors } from './reducer';
import types from './types';

export default reducer;

export {
  types as userTypes,
  sagas as userSagas,
  actions as userActions,
  selectors as userSelectors,
};
