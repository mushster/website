import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BookNotes = () => {
  const { bookId } = useParams();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Load markdown file based on bookId
    fetch(`/book-notes/${bookId}.md`)
      .then(response => response.text())
      .then(text => setNotes(text))
      .catch(error => console.error('Error loading notes:', error));
  }, [bookId]);

  return (
    <div className="prose prose-sm sm:prose-base mx-auto px-4">
      <ReactMarkdown>{notes}</ReactMarkdown>
    </div>
  );
};

export default BookNotes; 