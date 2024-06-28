import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "../services/api";

const CreateTheme: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [allowsImages, setAllowsImages] = useState<boolean>(false);
  const [allowsVideos, setAllowsVideos] = useState<boolean>(false);
  const [allowsTexts, setAllowsTexts] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTheme({ name, allowsImages, allowsVideos, allowsTexts });
      if (
        window.confirm(
          "Theme created successfully! Do you want to go back to the homepage?"
        )
      ) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating theme:", error);
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
      <h2 className="text-2xl mb-4">Create Theme</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowsImages"
            checked={allowsImages}
            onChange={(e) => setAllowsImages(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="allowsImages" className="text-gray-700 cursor-pointer">
            Allows Images
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={allowsVideos}
            id="allowsVideos"
            onChange={(e) => setAllowsVideos(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="allowsVideos" className="text-gray-700 cursor-pointer">
            Allows Videos
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowsTexts"
            checked={allowsTexts}
            onChange={(e) => setAllowsTexts(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="allowsTexts" className="text-gray-700 cursor-pointer">Allows Texts</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create Theme
        </button>
      </form>
    </div>
  );
};

export default CreateTheme;
