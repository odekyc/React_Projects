import {combineReducers} from 'redux';
import DishReducer from './reducer_dish';

const rootReducer = combineReducers({
     mydish: DishReducer
});

export default rootReducer;
