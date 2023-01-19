import React from "react";

function QuestionItem({ questions, question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  function deleteQuestion() {
    onDelete(id);
  }
  function answerChange(event) {
    onAnswerChange(id, parseInt(event.target.value));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {questions.indexOf(question) + 1}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={answerChange}>
          {options}
        </select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
