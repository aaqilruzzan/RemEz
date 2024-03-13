import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import React, { useState, useEffect } from "react";
import Menu from "./Components/Menu";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import Progress from "./Pages/Progress";
import Quiz from "./Pages/Quiz";
import Footer from "./Components/Footer";
import WelcomeVideo from "./Components/WelcomeVideo";
import MouseIcon from "./Components/MouseIcon";
import { QuestionsProvider } from "./Context/QuestionsContext";
import { AnswersProvider } from "./Context/AnswersContext";

function App() {
  const [clicked, isClicked] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcomeVideo(false);
    }, 7000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <QuestionsProvider>
        <AnswersProvider>
          <Navbar clicked={clicked} isClicked={isClicked} />
          {clicked ? <Menu /> : null}
          {showWelcomeVideo && <WelcomeVideo />}
          <MouseIcon />
          <Routes>
            <Route exact path="" element={<Home />} />
            <Route exact path="quiz" element={<Quiz />} />
            <Route exact path="progress" element={<Progress />} />
            <Route exact path="contact-us" element={<ContactUs />} />
            <Route exact path="about-us" element={<AboutUs />} />
            <Route exact path="signin" element={<SignIn />} />
            <Route exact path="signup" element={<Signup />} />
          </Routes>
          <Footer />
        </AnswersProvider>
      </QuestionsProvider>
    </Router>
  );
}

export default App;
