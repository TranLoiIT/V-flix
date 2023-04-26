import { actions, sagas } from './actions';
import reducer, { selectors } from './reducer';
import types from './types';

export default reducer;

export {
  types as categoriesTypes,
  sagas as categoriesSagas,
  actions as categoriesActions,
  selectors as categoriesSelectors,
};
