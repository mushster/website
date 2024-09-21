import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;