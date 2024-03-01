function QuestionRow(props) {
  // props are question, accuracy, time taken
  // include the ui code from Progress.js accordingly
  let linearwidth = props.accuracy + "%";
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
      </td>
    </tr>
  );
}

export default QuestionRow;
