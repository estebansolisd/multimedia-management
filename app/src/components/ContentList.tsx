import React, { useEffect, useState } from "react";
import { fetchContents } from "../services/api";


const ContentList: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const loadContents = async () => {
      const data = await fetchContents();
      setContents(data);
    };
    loadContents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Content List</h2>
      <ul>
        {contents.map((content) => (
          <li key={content._id} className="mb-2">
            <h3 className="text-xl">{content.title}</h3>
            <p>{content.description}</p>
            <p>Type: {content.type}</p>
            <p>Created By: {content.createdBy.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;
