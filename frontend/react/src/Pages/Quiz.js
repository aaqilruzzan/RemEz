import "./Home.css";
import { useEffect, useState } from "react";
import Achievements from "./Achievements";
import "./Achievements.css";
function Quiz() {
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [loaded, setLoaded] = useState(false);
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
    setShowModal(true);
  }, []);

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
            <div class="question">
              <p>
                <b>Question 1: What is your favorite color?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>

            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 2: What is your favorite animal?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>

            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 3: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>

            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 4: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>
            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 5: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>
            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 6: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>
            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 7: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>
            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 8: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>
            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 9: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>
            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>

            <div class="question">
              <p>
                <b>Question 10: What is your favorite food?</b>
              </p>
              <textarea
                rows="8"
                cols="70"
                placeholder="Enter Your Answer"
              ></textarea>
            </div>
            <div class="button-wrapper">
              <button className="btn" onClick={toggleModal}>
                Submit Answer
              </button>
            </div>
          </div>

          <div class="main-container">
            <div class="photo">
              <img src="homePage3.png" alt="Your Photo" />
            </div>
            <div class="buttons-container">
              <div class="button-wrapper">
                <button className="btn" onClick={toggleModal}>
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
