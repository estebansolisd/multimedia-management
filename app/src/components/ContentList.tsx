import { Content } from '@/types';
import React, { useEffect, useState } from 'react';
import { fetchContents } from '../services/api';

const ContentList: React.FC = ({ role }: { role: string}) => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const loadContents = async () => {
      try {
        const data = await fetchContents();
        console.log(data, "data");
        
        setContents(data);
      } catch (error) {
        console.error('Failed to fetch contents:', error);
      }
    };

    loadContents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Content List</h2>
      <ul>
        {contents.map(content => (
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
