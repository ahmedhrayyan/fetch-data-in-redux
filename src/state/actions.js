import { CALL_API } from "./apiMiddleware";
export const QUESTIONS_REQUEST = "QUESTIONS_REQUEST";
export const QUESTIONS_SUCCESS = "QUESTIONS_SUCCESS";
export const QUESTIONS_FAILURE = "QUESTIONS_FAILURE";
export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";

function fetchQuestions(onSuccess) {
  return {
    [CALL_API]: {
      endpoint: "/api/questions",
      types: [QUESTIONS_REQUEST, QUESTIONS_SUCCESS, QUESTIONS_FAILURE],
      onSuccess,
    },
  };
}

export function loadQuestions(onSuccess) {
  // this is possible because I use redux-thunk middleware
  return function(dispatch, getState) {
    const currentState = getState();
    // don't make pointless requests
    if (currentState.questions.length !== 0) {
      return null;
    }
    // else dispatch fetchQuestions action
    return dispatch(fetchQuestions(onSuccess))
  } 
}

function fetchUser(userId, onSuccess) {
  return {
    [CALL_API]: {
      endpoint: `/api/users/${userId}`,
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      onSuccess,
    },
  };
}

export function loadUser(userId, onSuccess) {
  return function(dispatch, getState) {
    const currentState = getState();
    // don't make pointless requests
    if (currentState.users.find(item => item.user_id === userId)) {
      return null;
    }
    // else dispatch fetchUser action
    return dispatch(fetchUser(userId, onSuccess))
  } 
}
