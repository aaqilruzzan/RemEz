import React, { useState } from "react";
import PerCollectionPro from "../Components/PerCollectionPro";
import AllProgress from "../Components/AllProgress";

export default function ProgressTracker() {
  const [progress, setProgress] = useState(" ");

  const handleChange = (e) => {
    setProgress(e.target.value);
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="relative w-full lg:max-w-sm m-4">
          <select
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            onChange={handleChange}
          >
            <option>View all Progress</option>
            <option>History</option>
            <option>Economics</option>
            <option>Medicine</option>

            <option selected disabled>
              Select topic to view progress
            </option>
          </select>
        </div>
      </div>

      {progress && progress === "View all Progress" ? (
        <AllProgress />
      ) : (
        <PerCollectionPro />
      )}
    </>
  );
}
