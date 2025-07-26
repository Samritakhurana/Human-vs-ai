import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import * as tf from '@tensorflow/tfjs';

async function prepare() {
  try {
    if (import.meta.env.MODE === 'development') {
      await tf.ready();
      console.log('TensorFlow.js ready');
    }
  } catch (err) {
    console.error("Error during TensorFlow prepare:", err);
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
