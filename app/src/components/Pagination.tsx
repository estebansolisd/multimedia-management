import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
