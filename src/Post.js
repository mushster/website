import React from 'react';
import { useParams } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'katex/dist/katex.min.css';

const posts = {
  1: {
    title: "The Beauty of Mathematics",
    content: (
      <div className="space-y-4">
        <p>
          Mathematics is the language of the universe. It allows us to describe complex phenomena
          with elegant simplicity. For example, the famous equation:
        </p>
        <BlockMath math="e^{i\pi} + 1 = 0" />
        <p>
          This equation, known as Euler's Identity, combines five fundamental mathematical
          constants in a single expression. It's often described as the most beautiful equation
          in mathematics.
        </p>
      </div>
    )
  },
  2: {
    title: "The Power of Algorithms",
    content: (
      <div className="space-y-4">
        <p>
          Algorithms are at the heart of computer science. They allow us to solve complex
          problems efficiently. Here's a simple example of a recursive algorithm to calculate
          the nth Fibonacci number:
        </p>
        <SyntaxHighlighter language="python" style={docco}>
          {`def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Example usage
print(fibonacci(10))  # Output: 55`}
        </SyntaxHighlighter>
        <p>
          This algorithm demonstrates the power of recursion, where a function calls itself
          to solve a problem. The time complexity of this naive implementation is O(2<InlineMath math="^n" />),
          which can be improved using dynamic programming techniques.
        </p>
      </div>
    )
  }
};

const Post = () => {
  const { id } = useParams();
  const post = posts[id];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-4">{post.title}</h2>
      {post.content}
    </div>
  );
};

export default Post;