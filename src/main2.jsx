import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AppErrorBoundary } from './AppErrorBoundary.jsx';
import './scienceModeRouter.js';
import './subject-overrides.css';
import './science-navigation.css';
import './hindiEnhancer.js';
import './hindi-section.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
