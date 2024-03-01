import React, { useState } from "react";
import "./Home.css";


function Home() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="home-container">
        <div className="first-column">
          <h1>
            Welcome to our innovative
            <br /> Quiz Generation App!
          </h1>
          <p>
            Easily generate quizzes from uploaded PDFs and engage with
            auto-generated questions. Test your knowledge, compare your answers
            to the generated solutions, and enhance your learning experience.
          </p>
          <p>
            Enhance your learning experience with our intuitive platform
            designed for seamless exploration. Join us in unlocking knowledge,
            ten quiz at a time!"
          </p>
          <button className="custom-button">Let's Start</button>
        </div>
        <div className="second-column">
          <img
            src="HomePage1.png"
            alt="Your Image Alt Text"
            className="image"
          />
        </div>
      </div>

      <div className="home-container">
        <div className="first-column">
          <h1>Upload Your File !!</h1>
          <p>
            Welcome to our intuitive file upload feature! Seamlessly upload your
            PDFs by simply dragging and dropping them into the designated area.
            Effortlessly bring your content to life within our platform. Whether
            it's lectures, articles, or study materials, our drag-and-drop
            function makes the process smooth and hassle-free. Take the first
            step toward generating quizzes and exploring knowledge – start by
            uploading your PDFs now!
          </p>
          <button className="custom-button2">Upload File</button>
        </div>

        <div className="second-column">
          <img
            src="/HomePage2.png"
            alt="Your Image Alt Text"
            className="image"
          />
        </div>
      </div>

      <div class="container">
        <div class="question">
          <p>
            <b>Question 1: What is your favorite color?</b>
          </p>
          <textarea
            rows="10"
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
            rows="10"
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
            rows="10"
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
            rows="10"
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
            rows="10"
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
            rows="10"
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
            rows="10"
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
            rows="10"
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
            rows="10"
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
            rows="10"
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
              Submit Answer
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

);
};

export default Home;
