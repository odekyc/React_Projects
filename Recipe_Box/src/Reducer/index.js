import {combineReducers} from 'redux';
import DishReducer from './reducer_dish';
import IngreReducer from './reducer_ingres';

const rootReducer = combineReducers({
     mydish: DishReducer,
     myingre: IngreReducer
});

export default rootReducer;
