import React from 'react';
import { Link } from 'react-router-dom';

const Writing = () => {
  const posts = [
    { id: 1, title: "The Beauty of Mathematics" },
    { id: 2, title: "The Power of Algorithms" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-light mb-4">Writing</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link 
              to={`/writing/${post.id}`} 
              className="text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Writing;