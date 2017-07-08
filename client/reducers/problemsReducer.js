import initialState from './initialState';

export default function problemsReducer(state=initialState.problems, action) {
  switch(action.type) {
    case 'GET_PROBLEMS':
      return  action.payload;
    default:
      return state;
  }
}
