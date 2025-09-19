import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

export const fetchBooks = (params) => API.get("/books", { params });
export const fetchBookById = (id) => API.get(`/books/${id}`);
