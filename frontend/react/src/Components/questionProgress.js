function questionProgress(props) {
  let count = 1;
  return (
    <div className="questionProgress">
      <span className="text-sm mx-2 font-medium">
        Q.{props.count} {props.question}{" "}
      </span>
      <span className="text-sm mx-2 font-bold text-sm">01:30'</span>
      <span className="text-sm mx-2 font-bold text-sm text-green-500">45%</span>
    </div>
  );
}

export default questionProgress;
