import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './styles.css';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <AppProvider><App /></AppProvider>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

window.__WORKSPHERE_STARTED__ = true;
