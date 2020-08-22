import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { fetchQuestions, fetchUser } from "./state/actions";

function App({ getQuestions, getUser, questions, users }) {
  // load questions on mount
  useEffect(() => {
    function onQuestionsSuccess(res) {
      for (const question of res.questions) {
        // load the user who have asked the question
        getUser(question.user_id);
      }
    }
    getQuestions(onQuestionsSuccess);
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

function mapStateToProps(state) {
  return {
    questions: state.questions,
    users: state.users,
  };
}

const mapDispatchToProps = {
  getQuestions: fetchQuestions,
  getUser: fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
