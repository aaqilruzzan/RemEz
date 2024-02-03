import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './Components/Navbar';
import { useState } from 'react';
import Menu from './Components/Menu';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';


function App() {
  const[clicked,isClicked] = useState(false)
  return (
    <Router>
      <Navbar clicked={clicked} isClicked={isClicked}/>
      {clicked? <Menu/>: null}

      <Routes>
        <Route exact path='' element={<Home/>}/>
        <Route exact path='contact-us' element={<ContactUs/>}/>
        <Route exact path='about-us' element={<AboutUs/>}/>
        <Route exact path='sign-in' element={<SignIn/>}/>
        <Route exact path='sign-up' element={<Signup/>}/>
        
       </Routes>
      
    </Router>
  );
}

export default App;
