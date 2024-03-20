import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import QuestionRow from "./questionRow";
import axios from "axios";
import { jsPDF } from "jspdf";
import { FaTrashAlt } from "react-icons/fa";

function PerCollectionPro(props) {
  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState({});
  const [times, setTimes] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [accuracy, setAccuracy] = useState({});
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [prevTotalActiveTime, setPrevTotalActiveTime] = useState(0);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isHovered, setIsHovered] = useState(false);
  const [systemAnswers, setSystemAnswers] = useState(false);
  let changeInActiveTimePercentage;
  let changeInActiveTimeClass;
  let changeInActiveTimePercentageNo;

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${API_URL}/getdata/${props.topic}`);
        setQuestions(response.data.questions);
        setUserAnswers(response.data.userAnswers);
        setTimes(response.data.times);
        setAccuracy(response.data.similarityScores);
        setAverageAccuracy(response.data.averageSimilarityScore);
        setPrevTotalActiveTime(response.data.prevTotalActiveTime);
        setSystemAnswers(response.data.systemAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoaded(true);
    };

    fetchProgress();
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  const handleDownload = async () => {
    try {
      const doc = new jsPDF("portrait", "px","a4");
      let yOffset = 20;
  
      doc.setFillColor("#CDCDCD");
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");
      doc.setTextColor(0, 0, 0);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.text(`Topic : ${props.topic}`, pageWidth / 2, yOffset, { align: "center" });
      
      
      yOffset += 25;
      doc.setTextColor(0, 0, 0);
  
      Object.keys(questions).forEach((key) => {

      const pageWidth = doc.internal.pageSize.getWidth();
      const marginLeft = 50;
      const marginRight = 50;
      const maxLineWidth = pageWidth - marginLeft - marginRight;
      const pageHeight = doc.internal.pageSize.getHeight() - 20; 
  
      doc.setTextColor("009FE3");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      
      yOffset += 25;
      doc.setTextColor(0, 0, 0);


        const question = questions[key];
        const answer = userAnswers[key] === undefined ? "No Answer Provided" : userAnswers[key];
        const modelAnswer = systemAnswers[key] ? systemAnswers[key] : "N/A";
        const questionAccuracy = accuracy[key] ? `${Math.round(accuracy[key])}%` : "N/A";
  
        // Assuming splitTextToSize is correctly used with maxLineWidth for each text
        let questionText = doc.splitTextToSize(`Question ${key}: ${question}`, maxLineWidth);
        let answerText = doc.splitTextToSize(`User Answer: ${answer}`, maxLineWidth);
        let modelAnswerText = doc.splitTextToSize(`Model Answer: ${modelAnswer}`, maxLineWidth);
        let accuracyText = doc.splitTextToSize(`Accuracy ${key}: ${questionAccuracy}`, maxLineWidth);
  
        // Function to add text and manage page breaks
        const addTextWithPageBreak = (textArray, spacing) => {
          textArray.forEach(line => {
            if (yOffset + spacing > pageHeight) {
              doc.addPage();
              yOffset = 10; // Reset yOffset for new page
              doc.setFillColor("#CDCDCD");
              doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");
            }
            doc.text(line, marginLeft, yOffset);
            yOffset += spacing;
          });
        };
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        addTextWithPageBreak(questionText, 20);
  
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        addTextWithPageBreak(answerText, 20);
        addTextWithPageBreak(modelAnswerText, 20);
        addTextWithPageBreak(accuracyText, 20);
  
        yOffset += 20; // Additional space before next question
      });
  
      doc.save(`Questions & Answers - ${props.topic}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  

  // Calculating total active time
  const totalActiveTimeMs = Object.values(times).reduce(
    (acc, time) => acc + time,
    0
  ); // Sum in milliseconds
  const totalActiveTimeSecs = Math.round(totalActiveTimeMs / 1000); // Converting to seconds
  const totalActiveMinutes = Math.floor(totalActiveTimeSecs / 60); // Total minutes
  const totalActiveSeconds = totalActiveTimeSecs % 60; // Remaining seconds
  const totalActiveTimeFormatted = `${totalActiveMinutes}m ${totalActiveSeconds}s`; // Formatting as "Xm Ys"

  if (prevTotalActiveTime != null) {
    changeInActiveTimePercentageNo = Math.round(
      ((totalActiveTimeSecs - prevTotalActiveTime) / prevTotalActiveTime) * 100
    );

    changeInActiveTimePercentage =
      changeInActiveTimePercentageNo > 0
        ? `+${changeInActiveTimePercentageNo} % compared to the previous round`
        : `${changeInActiveTimePercentageNo} % compared to the previous round`;
    changeInActiveTimeClass =
      changeInActiveTimePercentageNo < 0 ? "text-green-500" : "text-red-500";
  } else {
    changeInActiveTimePercentage = "No previous round to compare";
    changeInActiveTimeClass = "text-blue-500";
  }

  const noOfAnswers = Object.keys(userAnswers).length;

  

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this topic and all associated data?")) {
      try {
        await axios.delete(`${API_URL}/deletetopic/${props.topic}`);
        alert("Topic deleted successfully");
        
        window.location.reload();
      } catch (error) {
        console.error("Error deleting the topic:", error);
        alert("Failed to delete the topic");
      }
    }
  };

  return (
    <div class="min-h-screen bg-gray-50/50">
      <div class="p-4 xl:ml-10">
        <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div class="capitalize">
              <nav aria-label="breadcrumb" class="w-max">
                <ol class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                  <li class="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                    <a href="#">
                    <p class="flex items-center antialiased font-sans text-lg leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                      dashboard<span class="mr-2"></span><FaTrashAlt size={24} onClick={handleDelete} className="ml-2 cursor-pointer" title="Delete topic" />
                    </p>
                      
                    </a>
                    
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </nav>
        <div class="mt-12">
          <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="flex justify-center p-1">
                <div className="w-20 my-3">
                  <CircularProgressbar
                    value={averageAccuracy}
                    text={`${averageAccuracy}%`}
                  />
                </div>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-center">
                  {/* <strong class="text-green-500">Passed</strong>&nbsp;, Grade: S */}
                  {averageAccuracy >= 75 ? (
                    <>
                      <strong className="text-green-500">Passed</strong>
                      &nbsp;Grade: A
                    </>
                  ) : averageAccuracy >= 65 ? (
                    <>
                      <strong className="text-green-500">Passed</strong>
                      &nbsp;Grade: B
                    </>
                  ) : averageAccuracy >= 50 ? (
                    <>
                      <strong className="text-green-500">Passed </strong>
                      &nbsp;Grade: C
                    </>
                  ) : (
                    <>
                      <strong className="text-red-500">Failed</strong>
                      &nbsp;Grade: D
                    </>
                  )}
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border  rounded-xl overflow-hidden  absolute -mt-4 grid h-16 w-16 place-items-center">
                <LinearProgress variant="determinate" value={(40, 100)} />
              </div>
              <div class="p-4 text-right">
                <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total active time
                </p>
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {totalActiveTimeFormatted}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-center">
                  <strong class={changeInActiveTimeClass}>
                    {changeInActiveTimePercentage}
                  </strong>
                </p>
              </div>
            </div>

            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                </svg>
              </div>
              <div class="p-4 text-right">
                <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  New Achievements
                </p>
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  2
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-center">
                  <strong class="text-green-500">+5%</strong>&nbsp;than the
                  previous round
                </p>
              </div>
            </div>
          </div>

          <div class="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1">
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
              <div class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                <div>
                  <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                    Question Progress
                  </h6>
                  <p class="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="h-4 w-4 text-blue-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <strong>{noOfAnswers} done</strong> in this round
                  </p>
                </div>
                <button
                  aria-expanded="false"
                  aria-haspopup="menu"
                  id=":r5:"
                  class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                  type="button"
                >
                  <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currenColor"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table class="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Question
                        </p>
                      </th>
                      <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Time taken
                        </p>
                      </th>
                      <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Accuracy
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(questions).map((key) => (
                      <QuestionRow
                        question={questions[key]}
                        timeTaken={Math.round(times[key] / 1000) + "s"}
                        accuracy={accuracy[key]}
                        userAnswer={userAnswers[key] || "No answer provided"}
                      ></QuestionRow>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleDownload}
                    onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      width: "200px", // Set the button width
                      margin: "15px",
                      backgroundColor: isHovered ? "#000000" : "#0C7DFF",
                      color: "white",
                      borderRadius: "20px", // Rounded corners
                      padding: "10px 20px", // Top & Bottom, Left & Right padding
                      fontSize: "16px", // Text size
                      border: "none", // Remove default border
                      cursor: "pointer", // Mouse pointer on hover
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
                    }}
                  >
                    Download Q&A
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PerCollectionPro;
