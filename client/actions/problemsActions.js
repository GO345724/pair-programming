import axios from 'axios';

export function getProblems() {
  return dispatch => {
    return axios({
      method: 'get',
      url: `https://code-pair-api.herokuapp.com/api/v1/challenges`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if(response.statusText === "OK") {
          if(!response.data.error) {
            dispatch(getProblemsSuccess(response.data));
          }
        }
      })
      .catch(error => {throw error});
  };
}

function getProblemsSuccess(problems) {
  return {
    type: "GET_PROBLEMS",
    payload: problems
  }
}
