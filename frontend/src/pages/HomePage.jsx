import { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchBooks({ page, limit, ...filters }).then((res) => {
      setBooks(res.data.books);
      setTotal(res.data.total);
    });
  }, [page, filters]);

  const handleSearch = (search) => setFilters((f) => ({ ...f, search }));
  const handleFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <>
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <div className="grid">
        {books.map((b) => (
          <BookCard key={b._id} book={b} />
        ))}
      </div>
      <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
    </>
  );
}
