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
import NotesPage from "./Pages/NotePage";
import RemindersPage from "./Pages/ReminderPage";
import { AnswersProvider } from "./Context/AnswersContext";
import { QuestionsProvider } from "./Context/QuestionsContext";
import Footer from "./Components/Footer";
import WelcomeVideo from "./Components/WelcomeVideo";
import MouseIcon from "./Components/MouseIcon";
import { UploadProvider } from "./Context/PdfUploadContext";
import { useLoading } from "./Context/LoadingContext";

function App() {
  const [clicked, isClicked] = useState(false);
  const { loading } = useLoading();

  return (
    <Router>
      <QuestionsProvider>
        <AnswersProvider>
          <UploadProvider>
            <Navbar clicked={clicked} isClicked={isClicked} />
            {clicked ? <Menu /> : null}
            {loading && <WelcomeVideo />}
            <MouseIcon />
            <Routes>
              <Route exact path="" element={<Home />} />
              <Route exact path="quiz" element={<Quiz />} />
              <Route exact path="progress" element={<Progress />} />
              <Route exact path="contact-us" element={<ContactUs />} />
              <Route exact path="about-us" element={<AboutUs />} />
              <Route exact path="signin" element={<SignIn />} />
              <Route exact path="signup" element={<Signup />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="reminders" element={<RemindersPage />} />
            </Routes>
            <Footer />
          </UploadProvider>
        </AnswersProvider>
      </QuestionsProvider>
    </Router>
  );
}

export default App;
