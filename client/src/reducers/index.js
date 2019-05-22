import { combineReducers } from 'redux';
import headerReducer from './ui/headerReducer';
import prodectReducer from './productsReducer';

const rootReducer = combineReducers({
    headerState: headerReducer,
    products: prodectReducer
});

export default rootReducer;