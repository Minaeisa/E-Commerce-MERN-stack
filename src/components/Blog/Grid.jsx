import  { useEffect, useState } from 'react';
import axios from 'axios';

function Grid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/posts?limit=12')
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading posts...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">{post.body}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>👍 {post.reactions.likes}</span>
                <span>👁️ {post.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
