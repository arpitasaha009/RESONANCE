import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

// Blog post form initial state
const initialForm = {
  title: "",
  content: "",
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm(initialForm);
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      setError("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  // Edit post
  const handleEdit = (post) => {
    setForm({ title: post.title, content: post.content });
    setEditingId(post._id);
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPosts();
    } catch (err) {
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Music Blog</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-lg p-4 mb-8 shadow"
      >
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none"
            rows={4}
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {editingId ? "Update Post" : "Add Post"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
        {error && <div className="text-red-400 mt-2">{error}</div>}
      </form>

      <div className="space-y-6">
        {loading && <div>Loading...</div>}
        {posts.length === 0 && !loading && (
          <div className="text-gray-400">No posts yet.</div>
        )}
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-900 rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <div className="space-x-2">
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => handleEdit(post)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="text-red-400 hover:underline"
                  onClick={() => handleDelete(post._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-gray-300 whitespace-pre-line">{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
