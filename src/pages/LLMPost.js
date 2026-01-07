import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

const LLMPost = () => {
  const { postId } = useParams();
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    // Load markdown content
    fetch(`/llms/${postId}.md`)
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading post:', error));

    // Load metadata for title
    fetch('/llms/posts.json')
      .then(response => response.json())
      .then(data => {
        const post = data.find(p => p.id === postId);
        setMeta(post);
      })
      .catch(error => console.error('Error loading metadata:', error));
  }, [postId]);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Helmet>
        <title>{meta?.title || 'Post'} - LLMs</title>
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/llms"
            className="text-gray-400 hover:text-[#b319ab] hover:italic transition-all"
          >
            &larr; Back
          </Link>
          <Link
            to="/"
            className="text-gray-400 hover:text-[#b319ab] hover:italic transition-all"
          >
            amusharaf.xyz
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {meta && (
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-light mb-2">{meta.title}</h1>
            <p className="text-gray-400 text-sm">{meta.lastUpdated}</p>
          </header>
        )}
        <div className="prose prose-sm sm:prose-base">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default LLMPost;
