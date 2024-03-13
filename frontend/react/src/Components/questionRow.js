import React, { useState } from "react";

function QuestionRow(props) {
  // props are question, accuracy, time taken
  // include the ui code from Progress.js accordingly
  let linearwidth = props.accuracy + "%";
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <tr>
      <td class="py-3 px-5 border-b border-blue-gray-50">
        <div class="flex items-center gap-4">
          <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
            {props.question}
          </p>
        </div>
      </td>

      <td class="py-3 px-5 border-b border-blue-gray-50">
        <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">
          {props.timeTaken}
        </p>
      </td>
      <td class="py-3 px-5 border-b border-blue-gray-50">
        <div class="w-10/12">
          <p class="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
            {props.accuracy}%
          </p>
          <div class="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
            <div
              class="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
              style={{ width: linearwidth }}
            ></div>
          </div>
        </div>
        <div
          className="mt-2 flex items-center cursor-pointer"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showAnswer ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
            />
          </svg>
          <span className="ml-2 text-xs text-blue-gray-600">Your Answer</span>
        </div>
        {showAnswer && (
          <p className="text-xs text-blue-gray-600 mt-1">
            {props.userAnswer || "No answer provided"}
          </p>
        )}
      </td>
    </tr>
  );
}

export default QuestionRow;
