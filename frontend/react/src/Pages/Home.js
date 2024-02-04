import React from 'react'
import "./Home.css";

function Home() {
  return (
    
    <><div className="home-container">
      <div className="first-column">
        <h1>Welcome to our innovative<br /> Quiz Generation App!</h1>
        <p>

          Easily generate quizzes from uploaded PDFs and engage with auto-generated questions.
          Test your knowledge, compare your answers to the generated solutions, and enhance your
          learning experience.</p>
        <p>Enhance your learning experience with our
          intuitive platform designed for seamless exploration.
          Join us in unlocking knowledge, ten quiz at a time!"

        </p>
        <button className="custom-button">Let's Start</button>
      </div>
      <div className="second-column">
        <img
          src='HomePage1.png' 
          alt="Your Image Alt Text"
          className="image" />

      </div>

    </div>

    <div className="home-container">
      
      <div className="first-column">
        <h1>Upload Your File !!</h1>
        <p>

        Welcome to our intuitive file upload feature! Seamlessly upload your PDFs by simply dragging and dropping them into the designated area. Effortlessly bring your content to life within our platform. Whether it's lectures, articles, or study materials, our drag-and-drop function makes the process smooth and hassle-free. 
        Take the first step toward generating quizzes and exploring knowledge – start by uploading your PDFs now!
        </p>
        <button className="custom-button2">Upload File</button>
      </div>


      <div className="second-column">
        <img
          src='/HomePage2.png' 
          alt="Your Image Alt Text"
          className="image" />

      </div>
      
      </div>
  </>

);
};

export default Home;
