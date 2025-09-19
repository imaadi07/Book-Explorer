import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../services/api";

export default function DetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookById(id).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <img src={book.thumbnailUrl} alt={book.title} />
      <div className="details-content">
        <h1>{book.title}</h1>
        <p><strong>Price:</strong> £{book.price}</p>
        <p><strong>Rating:</strong> {book.rating}</p>
        <p><strong>Status:</strong> {book.stock ? "In Stock" : "Out of Stock"}</p>
        <a href={book.detailUrl} target="_blank" rel="noreferrer">
          View on Original Site
        </a>
      </div>
    </div>
  );
}
