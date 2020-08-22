import { CALL_API } from "./apiMiddleware";
export const QUESTIONS_REQUEST = "QUESTIONS_REQUEST";
export const QUESTIONS_SUCCESS = "QUESTIONS_SUCCESS";
export const QUESTIONS_FAILURE = "QUESTIONS_FAILURE";
export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";

    /* USING REDUX THUNK WITHOUT CUSTOM API MIDDLEWARE */

// function questionsRequest() {
//   return {
//     type: QUESTIONS_REQUEST
//   }
// }
// function questionsSuccess(payload) {
//   return {
//     type: QUESTIONS_SUCCESS,
//     payload
//   };
// }
// function questionsFailure(payload) {
//   return {
//     type: QUESTIONS_FAILURE,
//     payload
//   }
// }

// export function fetchQuestions() {
//   return function (dispatch, getState) {
//     dispatch(questionsRequest());
//     return fetch("/api/questions")
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.success) {
//           return dispatch(questionsSuccess(res));
//         }
//         return dispatch(questionsFailure(res));
//       });
//   };
// }
// function userRequest() {
//   return {
//     type: USER_REQUEST,
//   };
// }
// function userSuccess(payload) {
//   return {
//     type: USER_SUCCESS,
//     payload,
//   };
// }
// function userFailure(error) {
//   return {
//     type: USER_FAILURE,
//     error,
//   };
// }

// function fetchUser(id) {
//   return function (dispatch) {
//     dispatch(userRequest());
//     return fetch(`/api/users/${id}`)
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.success) {
//           return dispatch(userSuccess(data));
//         }
//         return dispatch(userFailure(data));
//       });
//   };
// }

    /* USING CUSTOM API MIDDLEWARE */

export function fetchQuestions(onSuccess = null) {
  return {
    [CALL_API]: {
      endpoint: "/api/questions",
      types: [QUESTIONS_REQUEST, QUESTIONS_SUCCESS, QUESTIONS_FAILURE],
      onSuccess,
    },
  };
}

export function fetchUser(userId, onSuccess = null) {
  return {
    [CALL_API]: {
      endpoint: `/api/users/${userId}`,
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      onSuccess,
    },
  };
}
