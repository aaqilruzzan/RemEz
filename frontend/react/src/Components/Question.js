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
          rows="10"
          cols="70"
          placeholder="Enter Your Answer"
        ></textarea>
      </div>
    </>
  );
};

export default Question;
