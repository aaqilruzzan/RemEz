const Question = (props) => {
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
          rows="8"
          cols="70"
          placeholder="Enter Your Answer"
        ></textarea>
      </div>
      <div className="button-wrapper">
        <button
          className="btn"
          onClick={() => props.handleAnswerSubmit(props.id)}
        >
          Submit Answer
        </button>
      </div>
    </>
  );
};

export default Question;
