import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/approutes';
import ScrollToTop from './core/ScrollToTop';

// Ensure basename always has trailing slash to match Vite's base config '/demo/kidwin-preschool/'
const rawBase = import.meta.env.BASE_URL || '/';
const basename = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

// Safety redirect if accessed directly without trailing slash in the URL bar
const noSlashPath = basename.replace(/\/+$/, '');
if (typeof window !== 'undefined' && window.location.pathname === noSlashPath) {
  window.location.replace(`${basename}${window.location.search}${window.location.hash}`);
}

function App() {
  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
