
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import React, { useState, useEffect } from 'react';
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

function App() {
  const [clicked, isClicked] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowWelcomeVideo(false); // Hide the welcome video after 7 seconds
        }, 7000); // 7 seconds in milliseconds

        return () => clearTimeout(timeout); // Cleanup function to clear the timeout
    }, []);


  return (
    <Router>
      <Navbar clicked={clicked} isClicked={isClicked} />
      {clicked ? <Menu /> : null}
      {showWelcomeVideo && <WelcomeVideo />} {/* Show WelcomeVideo if it's the first visit */}

      <Routes>
        <Route exact path="" element={<Home />} />
        <Route exact path="progress" element={<Progress />} />
        <Route exact path="quiz" element={<Quiz />} />
        <Route exact path="contact-us" element={<ContactUs />} />
        <Route exact path="about-us" element={<AboutUs />} />
        <Route exact path="signin" element={<SignIn />} />
        <Route exact path="signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
