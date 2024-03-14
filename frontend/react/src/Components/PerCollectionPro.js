import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import QuestionRow from "./questionRow";
import axios from "axios";

function PerCollectionPro(props) {
  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState({});
  const [times, setTimes] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [accuracy, setAccuracy] = useState({});
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/getquestionsanswers/${props.topic}`
        );
        setQuestions(response.data[0].questions);
        setUserAnswers(response.data[0].userAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }

      try {
        const response = await axios.get(
          `${API_URL}/gettimesscores/${props.topic}`
        );
        setTimes(response.data[0].times);
        setAccuracy(response.data[0].similarityScores);
      } catch (error) {
        console.error("Error fetching times:", error);
      }

      setLoaded(true);
    };

    fetchProgress();
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  // Calculating total active time
  const totalActiveTimeMs = Object.values(times).reduce(
    (acc, time) => acc + time,
    0
  ); // Sum in milliseconds
  const totalActiveTimeSecs = Math.round(totalActiveTimeMs / 1000); // Converting to seconds
  const totalActiveMinutes = Math.floor(totalActiveTimeSecs / 60); // Total minutes
  const totalActiveSeconds = totalActiveTimeSecs % 60; // Remaining seconds
  const totalActiveTimeFormatted = `${totalActiveMinutes}m ${totalActiveSeconds}s`; // Formatting as "Xm Ys"
  const averageAccuracy =
    Object.values(accuracy).reduce((a, b) => a + b, 0) /
    Object.keys(accuracy).length;

  const noOfAnswers = Object.keys(userAnswers).length;

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
                      <p class="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                        dashboard
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
                    text={`${Math.round(averageAccuracy)}%`}
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
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong class="text-green-500">+3%</strong>&nbsp;than the
                  previous round
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
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PerCollectionPro;
