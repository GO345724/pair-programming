import {combineReducers} from 'redux';
import problems from './problemsReducer';
import currentUser from './currentUserReducer';

const rootReducer = combineReducers({
  currentUser,
  problems
})

export default rootReducer;
