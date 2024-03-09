import { useState } from "react";
import { useAnswers } from "../Context/AnswersContext";

const Question = (props) => {
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const { answers, setAnswers } = useAnswers();

  const handleAnswerSubmit = async (id) => {
    await props.handleAnswerSubmit(id);
    setAnswerSubmitted(true);
  };

  return (
    <>
      <div class="question">
        <p>
          <b>
            {props.number}
            {"."} {props.question}
          </b>
        </p>
        <textarea
          id={props.id}
          key={props.id}
          rows="8"
          cols="70"
          placeholder="Enter Your Answer"
          disabled={answerSubmitted}
        ></textarea>
      </div>
      {!answerSubmitted && ( // Render the button only if the answer is not yet submitted
        <div className="button-wrapper">
          <button
            key={props.id}
            className="btn"
            onClick={() => handleAnswerSubmit(props.id)}
          >
            Submit Answer
          </button>
        </div>
      )}

      {answerSubmitted && (
        <div className="mt-2 text-md text-gray-400">
          {answers[props.id] ? answers[props.id] : "No answer submitted"}
        </div>
      )}
    </>
  );
};

export default Question;
