import { Content } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import { fetchContents } from "../services/api";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import Pagination from "./Pagination";
import { VIDEO_FALLBACK } from "@/utils/constants";
import { isVideoUrlWithExtension } from "@/utils/video-util";

interface ContentListProps {
  filterType?: "category" | "theme" | "content";
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

  const categoriesContentCounter = useMemo(
    () =>
      contents.reduce((acc, content) => {
        return content.category.type in acc
          ? {
              ...acc,
              [content.category.type]: {
                ...acc[content.category.type],
                count: acc[content.category.type].count + 1,
              },
            }
          : {
              ...acc,
              [content.category.type]: {
                count: 1,
                name: content.category.name,
              },
            };
      }, {} as Record<string, { count: number; name: string }>),
    [contents]
  );

  useEffect(() => {
    const loadContents = () => {
      fetchContents()
        .then((data) => {
          setContents(data);
        })
        .catch((err) => console.error(err, "Failing to fetch contents"));
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
        content.category.type
          .toLowerCase()
          .includes(filterValue.toLowerCase())) ||
      (filterType === "content" &&
        [content.title, content.description].some((c) =>
          c.toLowerCase().includes(filterValue.toLowerCase())
        )) ||
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

    const iframeOptions = ["dailymotion"];

    switch (content.category.type) {
      case "video":
        if (
          reactPlayerCompatibleList.some((pattern) =>
            content.content.toLowerCase().includes(pattern)
          )
        ) {
          return (
            <ReactPlayer
              url={content.content}
              width="100%"
              height="100%"
              controls
            />
          );
        } else if (isVideoUrlWithExtension(content.content.toLowerCase())) {
          return (
            <video
              controls
              src={content.content}
              className="h-full w-full"
            ></video>
          );
        } else if (
          iframeOptions.some((pattern) =>
            content.content.toLowerCase().includes(pattern)
          )
        ) {
          return (
            <iframe src={content.content} className="h-full w-full"></iframe>
          );
        }
        return (
          <img
            src={VIDEO_FALLBACK}
            alt={content.title}
            className="h-full w-full"
          />
        );

      case "image":
        return (
          <img
            src={content.content}
            alt={content.title}
            className="h-full w-full"
          />
        );
      case "text":
        return (
          <div>
            <p className="text-justify">
              {content.content.substring(0, 200)}...
            </p>
            {content.content.length >= 200 && (
              <button
                onClick={() => handleShowMore(content)}
                className="text-blue-500 hover:underline"
              >
                Show more
              </button>
            )}
          </div>
        );
      default:
        return (
          <img
            src={content.category.thumbnail}
            alt={content.title}
            className="h-full w-full"
          />
        );
    }
  };

  const groupedContents = useMemo(() => {
    return currentContents.reduce((acc, content) => {
      if (!acc[content.category.type]) {
        acc[content.category.type] = {
          thumbnail: content.category.thumbnail, // Include thumbnail here
          themes: {},
        };
      }
      if (!acc[content.category.type].themes[content.theme.name]) {
        acc[content.category.type].themes[content.theme.name] = [];
      }
      acc[content.category.type].themes[content.theme.name].push(content);
      return acc;
    }, {} as Record<string, { thumbnail: string; themes: Record<string, Content[]> }>);
  }, [currentContents]);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold">Content List</h2>
      <div className="mb-4 flex gap-4">
        {Object.keys(categoriesContentCounter).map((k) => (
          <span key={k} className="badge">
            {categoriesContentCounter[k].name}:{" "}
            {categoriesContentCounter[k].count}
          </span>
        ))}
      </div>
      {currentContents.length ? (
        Object.keys(groupedContents).map((categoryType) => (
          <div key={categoryType} className="mb-8">
            <h4 className="text-xl mb-2 font-medium capitalize">
              Category: {categoryType}
            </h4>
            <img
              onError={(e) => (e.currentTarget.src = VIDEO_FALLBACK)}
              src={groupedContents[categoryType].thumbnail}
              alt={categoryType}
              className="mb-4 w-32 h-32 object-cover"
            />
            {Object.keys(groupedContents[categoryType].themes).map(
              (themeName) => (
                <div key={themeName} className="mb-4">
                  <h4 className="text-lg mb-2"> Theme: {themeName}</h4>
                  <ul className="flex flex-wrap gap-4">
                    {groupedContents[categoryType].themes[themeName].map(
                      (content) => (
                        <li
                          key={content._id}
                          className="bg-white shadow-md rounded-md p-4 w-full md:w-[48%] lg:w-[32%]"
                        >
                          <h3 className="text-xl mb-2">{content.title}</h3>
                          <div className="h-[300px]">
                            {renderContent(content)}
                          </div>
                          <p>Credits: {content.createdBy.username}</p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
          </div>
        ))
      ) : (
        <div>
          {filterValue
            ? "No result have been found !"
            : "No content added yet !"}
        </div>
      )}
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
