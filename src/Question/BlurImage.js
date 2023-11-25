import React from 'react';
import './BlurImage.css';

// <BlurImage duration={5}/
const BlurImage = ({ duration, imageName  }) => {
  const imagePath = require(`../images/${imageName}`) 
  return (
    <div className="image-container">
      <img src={imagePath} className="blur-in" 
      style={{animationDuration: `${duration}s`}} 
      alt='description'
      />
    </div>
  );
}
export default BlurImage;
