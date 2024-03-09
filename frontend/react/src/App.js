import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import Menu from "./Components/Menu";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import Progress from "./Pages/Progress";
import Quiz from "./Pages/Quiz";
import { QuestionsProvider } from "./Context/QuestionsContext";
import { AnswersProvider } from "./Context/AnswersContext";

function App() {
  const [clicked, isClicked] = useState(false);
  return (
    <Router>
      <QuestionsProvider>
        <AnswersProvider>
          <Navbar clicked={clicked} isClicked={isClicked} />
          {clicked ? <Menu /> : null}

          <Routes>
            <Route exact path="" element={<Home />} />
            <Route exact path="quiz" element={<Quiz />} />
            <Route exact path="progress" element={<Progress />} />
            <Route exact path="contact-us" element={<ContactUs />} />
            <Route exact path="about-us" element={<AboutUs />} />
            <Route exact path="signin" element={<SignIn />} />
            <Route exact path="signup" element={<Signup />} />
          </Routes>
        </AnswersProvider>
      </QuestionsProvider>
    </Router>
  );
}

export default App;
