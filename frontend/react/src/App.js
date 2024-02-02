import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './Components/Navbar';
import { useState } from 'react';
import Menu from './Components/Menu';


function App() {
  const[clicked,isClicked] = useState(false)
  return (
    <Router>
      <Navbar clicked={clicked} isClicked={isClicked}/>
      {clicked? <Menu/>: null}
      
    </Router>
  );
}

export default App;
