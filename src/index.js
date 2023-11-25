import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AudioProvider } from './AudioProvider';
import BackgroundAudio from './Question/BackgroundAudio';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AudioProvider>
      <>
      <BackgroundAudio  />
      <App />
      </>
      
    </AudioProvider>
  </React.StrictMode>
);
