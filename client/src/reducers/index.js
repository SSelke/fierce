import { combineReducers } from 'redux';
import headerReducer from './ui/headerReducer';

const rootReducer = combineReducers({
    headerState: headerReducer
});

export default rootReducer;