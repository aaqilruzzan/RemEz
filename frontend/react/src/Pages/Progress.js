import React, { useEffect, useState } from "react";
import PerCollectionPro from "../Components/PerCollectionPro";
import AllProgress from "../Components/AllProgress";
import axios from "axios";
import SelectTopic from "../Components/SelectTopic";
import { jsPDF } from "jspdf";


export default function ProgressTracker() {
  const [progress, setProgress] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${API_URL}/getnames`);
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);


  const handleDownload = () => {
    var doc= new jsPDF('landscape', 'px', 'a4', 'false');
    doc.save('Questions & Answers.pdf');
  };

  return (
    <>
      <div className="flex items-center justify-center ">
      
        <div className="relative w-full lg:max-w-sm m-4">
        
          <select
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            onChange={handleChange}
            value={progress}
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

      {progress === "" ? (
        <SelectTopic />
      ) : progress === "View all Progress" ? (
        <AllProgress key={progress} />
      ) : (
        <PerCollectionPro key={progress} topic={progress} />
      )}
    </>
  );
}
