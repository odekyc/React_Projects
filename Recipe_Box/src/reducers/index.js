import {combineReducers} from 'redux';
import Ingres from './ingreContent';

const rootReducer=combineReducers({
      contents: Ingres
});

export default rootReducer;