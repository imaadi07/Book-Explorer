import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

export default function App() {
  return (
    <Router>
      <header>Book Explorer</header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
