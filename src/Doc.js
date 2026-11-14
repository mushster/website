import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Fetches one markdown file and renders it. Loaded on demand so the home page stays light.
export default function Doc({ src }) {
  const [text, setText] = useState('');
  useEffect(() => {
    let live = true;
    setText('');
    fetch(src)
      .then((r) => r.text())
      .then((t) => live && setText(t))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [src]);
  return <ReactMarkdown>{text}</ReactMarkdown>;
}
