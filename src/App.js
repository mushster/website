import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

// The content pages pull in the markdown renderer, so they load only when visited.
const BookNotes = lazy(() => import('./components/BookNotes'));
const LLMsHome = lazy(() => import('./pages/LLMsHome'));
const LLMPost = lazy(() => import('./pages/LLMPost'));

function App() {
  return (
    <HashRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:bookId" element={<BookNotes />} />
          <Route path="/llms" element={<LLMsHome />} />
          <Route path="/llms/:postId" element={<LLMPost />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;