import { Content, User } from "@/types";
import React, { useEffect, useState } from "react";
import { fetchContents } from "../services/api";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import Pagination from "./Pagination";
import { VIDEO_FALLBACK } from "@/utils/constants";
import { isVideoUrlWithExtension } from "@/utils/video-util";

interface ContentListProps {
  filterType?: "category" | "theme";
  filterValue?: string;
}

const ContentList: React.FC<ContentListProps> = ({
  filterType,
  filterValue,
}) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentsPerPage] = useState<number>(10);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  useEffect(() => {
    const loadContents = async () => {
      try {
        const data = await fetchContents();
        setContents(data);
      } catch (error) {
        console.error("Failed to fetch contents:", error);
      }
    };

    loadContents();
  }, []);

  const handleShowMore = (content: Content) => {
    setSelectedContent(content);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedContent(null);
  };

  const filteredContents = contents.filter((content) => {
    return (
      !filterValue ||
      (filterType === "category" &&
        content.type.type.toLowerCase().includes(filterValue.toLowerCase())) ||
      (filterType === "theme" &&
        content.theme.name.toLowerCase().includes(filterValue.toLowerCase()))
    );
  });

  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;
  const currentContents = filteredContents.slice(
    indexOfFirstContent,
    indexOfLastContent
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderContent = (content: Content) => {
    console.log(content);

    const reactPlayerCompatibleList = [
      "soundcloud",
      "youtube",
      "facebook",
      "vimeo",
      "file",
      "wistia",
      "mixcloud",
      "vidyard",
      "twitch",
    ];

    const iframeOptions = [
      "dailymotion"
    ]

    switch (content.type.type) {
      case "video":
        if (
          reactPlayerCompatibleList.some((pattern) =>
            content.content.toLowerCase().includes(pattern)
          )
        ) {
          return <ReactPlayer url={content.content} width="100%" height="100%" controls />;
        } else if (isVideoUrlWithExtension(content.content.toLowerCase())) {
          return <video controls src={content.content} className="h-full w-full"></video>;
        } else if(iframeOptions.some((pattern) => content.content.toLowerCase().includes(pattern))){
          return <iframe src={content.content} className="h-full w-full"></iframe>
        }
        return (
          <img src={VIDEO_FALLBACK} alt={content.title} className="h-full w-full" />
        );

      case "image":
        return (
          <img src={content.content} alt={content.title} className="h-full w-full" />
        );
      case "text":
        return (
          <div>
            <p className="text-justify">{content.content.substring(0, 200)}...</p>
            <button
              onClick={() => handleShowMore(content)}
              className="text-blue-500 hover:underline"
            >
              Show more
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Content List</h2>
      <div className="mb-4 flex space-x-4">
        <span className="badge">
          Images:{" "}
          {contents.filter((content) => content.type.type === "image").length}
        </span>
        <span className="badge">
          Videos:{" "}
          {contents.filter((content) => content.type.type === "video").length}
        </span>
        <span className="badge">
          Texts:{" "}
          {contents.filter((content) => content.type.type === "text").length}
        </span>
      </div>
      <div className="min-h-[300px]">
        <ul className="flex flex-wrap gap-4">
          {currentContents.map((content) => (
            <li key={content._id} className="bg-white shadow-md rounded-md p-4 w-full md:w-[48  %] lg:w-[32%]">
              <h3 className="text-xl mb-2">{content.title}</h3>
              <div className="h-[300px]">
                {renderContent(content)}
              </div>
              <p>Credits: {(content.createdBy as User).username}</p>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredContents.length / contentsPerPage)}
        paginate={paginate}
      />
      {selectedContent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Content Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>{selectedContent.title}</h2>
          <p>{selectedContent.content}</p>
          <button
            onClick={handleCloseModal}
            className="text-blue-500 hover:underline"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ContentList;
