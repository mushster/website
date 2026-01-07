import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const LLMsHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/llms/posts.json')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error loading posts:', error));
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Helmet>
        <title>LLMs - Aryan Musharaf</title>
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light">LLMs</h1>
          <Link
            to="/"
            className="text-gray-400 hover:text-[#b319ab] hover:italic transition-all"
          >
            amusharaf.xyz
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-gray-600 text-lg mb-8">
          A collection of thoughts and notes.
        </p>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post.id}
              to={`/llms/${post.id}`}
              className="block p-6 border border-gray-200 rounded-lg hover:border-[#b319ab] transition-all group"
            >
              <h2 className="text-xl font-normal mb-2 group-hover:text-[#b319ab] transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {post.summary}
              </p>
              <p className="text-gray-400 text-xs">
                {post.lastUpdated}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LLMsHome;
