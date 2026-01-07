import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import BookNotes from './components/BookNotes';
import LLMsHome from './pages/LLMsHome';
import LLMPost from './pages/LLMPost';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/books/:bookId" element={<BookNotes />} />
        <Route path="/llms" element={<LLMsHome />} />
        <Route path="/llms/:postId" element={<LLMPost />} />
      </Routes>
    </HashRouter>
  );
}

export default App;