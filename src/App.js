import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import BookNotes from './components/BookNotes';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/books/:bookId" element={<BookNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;