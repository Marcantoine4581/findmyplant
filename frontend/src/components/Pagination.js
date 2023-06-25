import React from 'react';

function Pagination({ currentPage, totalPages, onNextPage, onPrevPage, onGoToPage }) {
  return (
    <div>
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        Précédent
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onGoToPage(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Suivant
      </button>
    </div>
  );
}

export default Pagination;