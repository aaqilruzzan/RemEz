import "./Home.css";
import { useEffect, useState } from "react";
import Question from "../Components/Question";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpeedIcon from "@mui/icons-material/Speed";
import axios from "axios";
import React from "react";
import { useQuestions } from "../Context/QuestionsContext";
import { useAnswers } from "../Context/AnswersContext";
function Quiz() {
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [loaded, setLoaded] = useState(false);

  const { questions, setQuestions } = useQuestions();
  const { answers, setAnswers } = useAnswers();

  const [activeTime, setActiveTime] = useState({});

  const [userAnswers, setUserAnswers] = useState({});
  const [similarityScore, setSimilarityScore] = useState({});
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleTopicSubmit = () => {
    setShowModal(false);
    setLoaded(true);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    // Ensuring this effect runs only after the content has loaded
    if (!loaded) return;
    let startTimer;
    let stopTimer;

    const textareas = document.querySelectorAll("textarea");

    const attachEvents = () => {
      textareas.forEach((textarea, index) => {
        let startTime; // Declaring startTime outside to make it accessible to both startTimer and stopTimer

        startTimer = () => {
          startTime = Date.now(); // Initializing startTime when the textarea gains focus
        };

        stopTimer = () => {
          const endTime = Date.now(); // Capturing the time when the textarea loses focus
          const timeSpent = endTime - startTime; // Calculate the duration
          // Updating the state with the new time, adding it to the existing time for this index
          setActiveTime((prevTimes) => ({
            ...prevTimes,
            [index + 1]: (prevTimes[index + 1] || 0) + timeSpent,
          }));
        };

        // Attaching the startTimer function to the focus event
        textarea.addEventListener("focus", startTimer);
        // Attaching the stopTimer function to the blur event
        textarea.addEventListener("blur", stopTimer);
      });
    };

    attachEvents();
    // Returning a cleanup function to remove the event listeners

    return () => {
      textareas.forEach((textarea) => {
        textarea.removeEventListener("focus", startTimer);
        textarea.removeEventListener("blur", stopTimer);
      });
    };
  }, [loaded]);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleQuizSubmit = async () => {
    const averageSimilarityScore =
      Object.values(similarityScore).reduce((a, b) => a + b, 0) /
      Object.keys(similarityScore).length;

    const completedRound =
      Object.keys(questions).length === Object.keys(userAnswers).length
        ? true
        : false;

    try {
      const response = await axios.post(`${API_URL}/savesubject`, {
        name: topic,
        times: activeTime,
        questions: questions,
        userAnswers: userAnswers,
        similarityScores: similarityScore,
        averageSimilarityScore: Math.round(averageSimilarityScore),
        systemAnswers: answers,
        completedRound: completedRound,
      });
      if (response.status == 201) {
        alert("Quiz submitted successfully!");
      }
    } catch (error) {
      console.error("Error saving subject:", error);
      alert("Error saving subject!");
    }
  };

  const handleAnswerSubmit = async (questionId) => {
    const answerElement = document.getElementById(questionId);
    const answerValue = answerElement.value;

    if (answerValue === "") {
      alert("Please answer the question before submitting");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/calculatesimilarity",
        {
          userAnswer: answerValue,
          modelAnswer: answers[questionId],
        }
      );
      var similarityScore = response.data.similarityScore;
    } catch (error) {
      console.error("Error calculating similarity:", error);
      alert("Error calculating similarity!");
    }

    // Saving the answer in the `answers` state object
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerValue,
    }));

    setSimilarityScore((prevsimilarityScore) => ({
      ...prevsimilarityScore,
      [questionId]: similarityScore,
    }));
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Enter a suitable topic for your Quiz
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-white text-gray-800 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your topic"
                    onChange={(e) => setTopic(e.target.value)}
                  />

                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Your Quiz will be automatically generated based on the
                    uploaded PDF. This is just to give it a topic you would be
                    comfortable with in order to help us give you a better
                    experience.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleTopicSubmit}
                  >
                    Save topic
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {loaded ? (
        <>
          <div class="container">
            {Object.keys(questions).map((key) => (
              <React.Fragment key={key}>
                <Question
                  question={questions[key]}
                  id={key}
                  handleAnswerSubmit={handleAnswerSubmit}
                  number={parseInt(key, 10)}
                />

                <div className="bg-white shadow-lg rounded-lg p-6 space-y-10 mb-10">
                  <div className="flex items-center justify-evenly space-x-4">
                    <div className="flex justify-center gap-2">
                      <div className="p-2 bg-purple-200 rounded-full ">
                        <AccessTimeIcon />
                      </div>
                      <div>
                        <div className="text-gray-600 text-sm">
                          Total Time Spent
                        </div>
                        <div className="text-gray-900 text-2xl font-semibold">
                          {Math.round((activeTime[key] || 0) / 1000)} seconds
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      <div className="p-2 bg-purple-200 rounded-full">
                        <SpeedIcon />
                      </div>
                      <div>
                        <div className="text-gray-600 text-sm">
                          Accuracy Rating
                        </div>
                        <div className="text-gray-900 text-2xl font-semibold">
                          {similarityScore[key] ? similarityScore[key] : "--"}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div class="main-container">
            <div class="photo">
              <img src="homePage3.png" alt="Your Photo" />
            </div>
            <div class="buttons-container">
              <div class="button-wrapper">
                <button className="btn" onClick={handleQuizSubmit}>
                  Finish Quiz
                </button>
              </div>

              <div class="button-wrapper">
                <button class="btn1">Download Q&A</button>
              </div>
            </div>
          </div>

          {modal && (
            <div className="modal">
              <div className="overlay"></div>
              <div className="modal-content">
                <h2 className="head2">Quiz Hub</h2>
                <p>Accuracy Rating : 75%</p>
                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
export default Quiz;
