import {combineReducers} from 'redux';
import DishReducer from './reducer_dish';
import ActiveReducer from './reducer_active';

const rootReducer = combineReducers({
     mydish: DishReducer,
     activedish: ActiveReducer
});

export default rootReducer;
