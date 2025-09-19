import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.thumbnailUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p className="price">£{book.price}</p>
      <p>{book.rating} </p>
      <p>{book.stock ? "In Stock" : "Out of Stock"}</p>
      <Link to={`/book/${book._id}`} className="details-link">
        View Details →
      </Link>
    </div>
  );
}
