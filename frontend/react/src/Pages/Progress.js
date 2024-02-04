import React from "react";

export default function progressTracker() {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="relative w-full lg:max-w-sm m-4">
          <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option>History</option>
            <option>Economics</option>
            <option>Medicine</option>
            <option selected disabled>
              Select topic to view progress
            </option>
          </select>
        </div>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Progress
        </button>
      </div>
    </>
  );
}
