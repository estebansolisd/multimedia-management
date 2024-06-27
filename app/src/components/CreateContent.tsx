import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createContent, fetchThemes, fetchCategories } from "../services/api";
import { Category, Theme } from "@/types";

const CreateContent: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [createContentState, setCreateContentState] = useState({
    title: "",
    description: "",
    theme: "",
    type: "",
    content: "",
    themes: [] as Theme[],
    categories: [] as Category[],
  });

  const { title, description, theme, type, content, themes, categories } =
    createContentState;

  useEffect(() => {
    const getData = async () => {
      const newThemes = await fetchThemes();
      const newCategories = await fetchCategories();
      setCreateContentState((prev) => ({
        ...prev,
        themes: newThemes,
        categories: newCategories,
      }));
    };
    getData();
  }, []);

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContent({
        title,
        description,
        theme,
        type,
        content,
        createdBy: user?._id!,
      });
      if (confirm("Content saved! Do you want to return to the homepage ?")) {
        navigate("/")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setCreateContentState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <button
          className="bg-gray-600 text-white p-2"
          onClick={() => navigate("/")}
        >
          Return to home page
        </button>
      </div>
      <form
        onSubmit={handleCreateContent}
        className="min-w-[500px] flex flex-col gap-4 bg-gray-300 p-4"
      >
        <h1 className="text-center text-xl text-bold">Create Content</h1>

        <div>
          <label htmlFor="title">Add the title for your content</label>
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="min-w-32 p-2"
              placeholder="Title"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">
            Add the description for your content
          </label>
          <div>
            <textarea
              name="description"
              className="w-full"
              value={description}
              rows={4}
              onChange={handleChange}
              placeholder="What describes your content..."
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="theme">Select the theme of the content</label>
          <div>
            <select
              value={theme}
              id="theme"
              name="theme"
              onChange={handleChange}
              className="min-w-32 p-2"
              required
            >
              <option value="" disabled hidden selected>Please select an option</option>
              {themes.map((t: any) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="type">Select the category of the content</label>
          <div>
            <select
              value={type}
              id="type"
              name="type"
              onChange={handleChange}
              className="min-w-32 p-2"
              required
            >
              <option value="" disabled hidden selected>Please select an option</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="content">
            Add the URL of your video, image or text here
          </label>
          <div id="content">
            <textarea
              name="content"
              className="w-full"
              value={content}
              rows={4}
              onChange={handleChange}
              placeholder="Content URL or text"
              required
            />
          </div>
        </div>
        <div>
          <button className="bg-blue-500 text-white p-2" type="submit">
            Create Content
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContent;
