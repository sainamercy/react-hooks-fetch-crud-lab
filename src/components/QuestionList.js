import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter(
          (question) => question.id !== id
        );
        setQuestions(updatedQuestions);
      });
  }
  function handleAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) {
            return updatedQuestion;
          }
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }
  console.log(questions);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {
          /* display QuestionItem components here after fetching */
          questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              questions={questions}
              onDelete={handleDelete}
              onAnswerChange={handleAnswer}
            />
          ))
        }
      </ul>
    </section>
  );
}

export default QuestionList;
