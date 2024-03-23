import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useQuestions } from "../Context/QuestionsContext";
import { useAnswers } from "../Context/AnswersContext";
import { useUpload } from "../Context/PdfUploadContext";
import { useLoading } from "../Context/LoadingContext";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const [questionCount, setQuestionCount] = useState("");
  const Navigate = useNavigate();
  const uploadSectionRef = useRef(null);
  const { setQuestions } = useQuestions();
  const { setAnswers } = useAnswers();
  const { setUploadedPdf } = useUpload();
  const { loading, setLoading } = useLoading();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update the state with the selected file
  };
  const FLASK_API_URL =
    process.env.REACT_APP_FLASK_URL || "http://localhost:5000";

  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    await setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile); // 'file' is the field name expected by your backend
    formData.append("questionNo", questionCount);

    try {
      const response = await axios.post(
        `${FLASK_API_URL}/upload`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      await setQuestions(response.data.questions);
      await setAnswers(response.data.answers);
      await setUploadedPdf(true);
      await setLoading(false);
      alert("File uploaded successfully!");
      Navigate("/quiz");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const scrollToUpload = () => {
    uploadSectionRef.current.scrollIntoView({ behavior: "smooth" }); // Step 3: Use scrollIntoView to navigate
  };

  const handleQuestionCountChange = (event) => {
    setQuestionCount(event.target.value);
  };

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
          <button className="custom-button" onClick={scrollToUpload}>
            Let's Start
          </button>
        </div>
        <div className="second-column">
          <img
            src="HomePage1.png"
            alt="Your Image Alt Text"
            className="image"
          />
        </div>
      </div>

      <div className="home-container" ref={uploadSectionRef}>
        <div className="first-column">
          <h1 id="upload">Upload Your File !!</h1>
          <p>
            Welcome to our intuitive file upload feature! Seamlessly upload your
            PDFs by simply dragging and dropping them into the designated area.
            Effortlessly bring your content to life within our platform. Whether
            it's lectures, articles, or study materials, our drag-and-drop
            function makes the process smooth and hassle-free. Take the first
            step toward generating quizzes and exploring knowledge – start by
            uploading your PDFs now!
          </p>

          <div className="relative w-full lg:max-w-sm">
            <select
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              onChange={handleQuestionCountChange}
              value={questionCount}
            >
              {/* Conditionally render the default option */}
              {questionCount === "" && (
                <option value="">Select Number of Questions</option>
              )}
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <button
            className="custom-button2"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Upload PDF
          </button>
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            hidden={!selectedFile}
            onClick={uploadFile}
            className="custom-button3"
          >
            Submit PDF
          </button>
        </div>

        <div className="second-column">
          <img
            src="/HomePage2.png"
            alt="Your Image Alt Text"
            className="image"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
