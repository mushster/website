import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

// Loaded only when visited.
const LLMsHome = lazy(() => import('./pages/LLMsHome'));

function App() {
  return (
    <HashRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:bookId" element={<Home />} />
          <Route path="/llms" element={<LLMsHome />} />
          <Route path="/llms/:postId" element={<Home />} />
          <Route path="/notes-to-myself" element={<Home />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;