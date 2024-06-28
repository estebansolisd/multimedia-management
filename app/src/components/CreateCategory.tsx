import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../services/api';

const CreateCategory: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory({ name, type, thumbnail });
      if (window.confirm('Category created successfully! Do you want to go back to the homepage?')) {
        navigate('/');
      }
    } catch (error: any) {
        alert(error?.response?.data?.message ?? error?.message ?? "Something went wrong !")
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow-lg">
      <div>
        <button
          className="bg-gray-600 text-white p-2"
          onClick={() => navigate("/")}
        >
          Return to home page
        </button>
      </div>
      <h2 className="text-2xl mb-4">Create Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Thumbnail:</label>
          <textarea
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
