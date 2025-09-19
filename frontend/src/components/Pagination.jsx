export default function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const getPages = () => {
    let pages = [];
    const maxVisible = 3; 
    if (page > 2) pages.push(1);
    if (page > maxVisible + 1) pages.push("...");
    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - maxVisible) pages.push("...");
    if (page < totalPages - 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="dots">...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            disabled={page === p}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
