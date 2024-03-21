import React from 'react'
import "./Achievements.css";
import { Link } from 'react-router-dom';
const Achievements = () => {
  return (
    <>

    <h3 className='titles'>Achievements</h3>
    <div  className='main'>

      
    <div className='card'>
      <img alt="Gold" src='gold1.png' className='card-image'></img>
      <h2 className='card-title'>Gold</h2>
      <p className='card-text'>Correct Answer with Correct Time</p>
      <p className='score'>point:2</p>
      <Link to="/achievementGold" className="button-link">Achievements</Link>
    </div>

    <div className='card'>
      <img alt="Gold" src="silver.png" className='card-image'></img>
      <h2 className='card-title'>Silver</h2>
      <p className='card-text'>Correct Answer with Correct Time</p>
      <p className='score'>point:2</p>
      <Link to="/silver" className="button-link">Achievements</Link>
    </div>

    <div className='card'>
      <img alt="Gold" src="platinum.png" className='card-image'></img>
      <h2 className='card-title'>Platinum</h2>
      <p className='card-text'>Correct Answer with Correct Time</p>
      <p className='score'>point:2</p>
      <Link to="/platinum" className="button-link">Achievements</Link>
    </div>

    </div>

    </>
    
  )
}

export default Achievements