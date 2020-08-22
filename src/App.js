import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadQuestions, loadUser } from "./state/actions";

function App() {
  const questions = useSelector(state => state.questions);
  const users = useSelector(state => state.users)
  const dispatch = useDispatch();

  // load questions on mount
  useEffect(() => {
    function onQuestionsSuccess(res) {
      for (const question of res.questions) {
        // load the user who have asked the question
        dispatch(loadUser(question.user_id));
      }
    }
    dispatch(loadQuestions(onQuestionsSuccess));
  }, []); // eslint-disable-line


  return (
    <div className="App">
      {questions.map((question) => {
        const user = users.find((user) => user.user_id === question.user_id);
        return (
          <div key={question.id}>
            <h1>{question.content}</h1>
            <p>
              <small>{question.created_at}</small>
            </p>
            <p><strong>{user ? user.name : "loading..."}</strong></p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
