import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="left-section">
          <p>©2023 Project</p>
        </div>
        <div className="right-section">
          <button>Check History</button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="center-section">
        <p>Quiz Generator</p>
      </div>
    </div>
  );
};
    

export default Footer
