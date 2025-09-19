export default function SearchFilter({ onSearch, onFilter }) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => onSearch(e.target.value)}
      />

      <select onChange={(e) => onFilter("rating", e.target.value)}>
        <option value="">All Ratings</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>

      <label>
        <input
          type="checkbox"
          onChange={(e) => onFilter("inStock", e.target.checked)}
        />
        In Stock Only
      </label>
    </div>
  );
}
