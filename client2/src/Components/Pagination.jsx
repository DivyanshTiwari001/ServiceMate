import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({arr,page,totalPages}) {

    const {currentPage,setCurrentPage} = page;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
 
    const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  return (
      arr.length > 0 && totalPages > 1 && (
          <div className="flex flex-col items-center mt-8 sm:mt-12 space-y-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  currentPage === 1
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ChevronLeft size={16} className="sm:mr-1" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center space-x-1 overflow-x-auto max-w-xs sm:max-w-none">
                {generatePageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-2 sm:px-3 py-2 text-gray-400 text-sm">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors text-sm flex-shrink-0 ${
                          currentPage === page
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  currentPage === totalPages
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} className="sm:ml-1" />
              </button>
            </div>

            {/* Pagination Info */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages} • {arr.length} total results
              </p>
            </div>
          </div>
        )
  )
}

export default Pagination