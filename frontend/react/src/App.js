import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
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
import WelcomeVideo from "./Components/WelcomeVideo";
import MouseIcon from "./Components/MouseIcon";
import { UploadProvider } from "./Context/PdfUploadContext";
import { useLoading } from "./Context/LoadingContext";
import "./App.css";

function Layout() {
  const location = useLocation();
  const { loading } = useLoading();
  const [clicked, isClicked] = useState(false);

  // Decide whether to show Navbar and Footer based on the current location
  const showNavbarAndFooter = location.pathname !== "/signin" && location.pathname !== "/signup";

  return (
    <>
      {showNavbarAndFooter && <Navbar clicked={clicked} isClicked={isClicked} />}
      {clicked ? <Menu /> : null}
      {loading && <WelcomeVideo />}
      <MouseIcon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="progress" element={<Progress />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<Signup />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="reminders" element={<RemindersPage />} />
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <QuestionsProvider>
        <AnswersProvider>
          <UploadProvider>
            <Layout />
          </UploadProvider>
        </AnswersProvider>
      </QuestionsProvider>
    </Router>
  );
}

export default App;
