import React, { useEffect, useRef } from 'react';
import Pixelate from 'pixelate';
import './PixelizeImage.css';

const PixelizeImage = ({ duration, imageName }) => {
  const imagePath = require(`../images/${imageName}`);
  // const imagePath = require(`${imageName}`);
  const imageRef = useRef(null);
  const pixelateRef = useRef(null);
  const maxPixel = 0.99
  const minPixel = 0.7;

  useEffect(() => {
    const imageElement = imageRef.current;
    pixelateRef.current = new Pixelate(imageElement, {
      amount: maxPixel, // Start with full pixelation
    });
    
    let intervalId;
    const easeOutQuad = (t) => t / (3 - t); // Easing function: starts slowly, ends fast
    if (imageElement) {
      const startTime = Date.now();
      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = elapsedTime / (duration * 1000);
        const easedProgress = easeOutQuad(progress); // Apply easing function to progress
        const amount = maxPixel - ((maxPixel - minPixel) * easedProgress);
        if (amount <= minPixel) {
          clearInterval(intervalId);
          pixelateRef.current.setAmount(0).render();
        } else {
          pixelateRef.current.setAmount(amount).render();
        }
      }, 500);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [duration]);

  return (
    <div className="pixelate-image-container"><img
        ref={imageRef}
        src={imagePath}
        className="pixelate-image"
        alt='description'
      /></div>
  );
};
export default PixelizeImage;