import React from 'react';
import './MouseIcon.css'; // Import CSS file for styling

const MouseIcons = () => {
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF', '#FF00FF', '#FF1493', '#FF4500'];

  return (
    <div className="mouse-icons">
      {colors.map((color, index) => (
        <div className="mouse-icon" key={index} style={{ borderColor: color }}>
          <div className="drag-line" style={{ backgroundColor: color }}></div>
        </div>
      ))}
    </div>
  );
}

export default MouseIcons;
