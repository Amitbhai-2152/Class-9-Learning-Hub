import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AppErrorBoundary } from './AppErrorBoundary.jsx';
import './reload-router.js';
import './scienceModeRouter.js';
import './subject-overrides.css';
import './science-navigation.css';
import './science-learn-navigator-fix.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
