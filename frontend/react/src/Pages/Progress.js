import React, { useEffect, useState } from "react";
import PerCollectionPro from "../Components/PerCollectionPro";
import AllProgress from "../Components/AllProgress";
import axios from "axios";

export default function ProgressTracker() {
  const [progress, setProgress] = useState(" ");
  const [topics, setTopics] = useState([]);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getnames");
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  console.log(topics);
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="relative w-full lg:max-w-sm m-4">
          <select
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            onChange={handleChange}
          >
            <option>View all Progress</option>
            {topics.map((topic, index) => (
              <option key={index}>{topic}</option>
            ))}

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
