# Book Explorer App

**Book Explorer** is a full-stack web application that allows users to browse and search for books. The app automatically scrapes book data from [Books to Scrape](https://books.toscrape.com/), stores it in a database, and presents it in a modern React frontend with filter and search capabilities.

---

## Features

- Scrapes book data: title, price, stock availability, rating, detail URL, thumbnail URL
- Stores scraped data in a database (MongoDB)
- Backend API service with:
  - Paginated listing of books
  - Search by title
  - Filter by rating, price range, and stock availability
  - Book detail endpoint
  - API to trigger data refresh via scraper
- Frontend React app with:
  - Responsive book grid/cards
  - Search and filters
  - Book detail modal/page
- Modular, reusable components and clean API responses

---

## Project Structure

BookExplorer/
├── scraper/ # Scraper script to fetch data
├── backend/ # Node.js/Express API server
├── frontend/ # React application
└── README.md


---

## Getting Started

---

### 1. Scraper

1. Navigate to the scraper directory:

```bash
cd scraper
```

2. Install dependencies:
```bash
npm install
```
3. Run the scraper to populate the DB:
```bash
node scraper.js
```

### 2. backend

1. Navigate to the Backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
```bash
DB_URI=<your-database-uri>
PORT=5000
```
4. Start the backend server
```bash
npm start
```
5. API Endpoints:
| Endpoint         | Method | Description                                        |
|-----------------|--------|----------------------------------------------------|
| `/api/books`     | GET    | Paginated list of books, supports filters & search |
| `/api/books/:id` | GET    | Details of a single book                           |
| `/api/refresh`   | POST   | Trigger scraper to refresh database (bonus)        |


### 3. Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend
```bash
npm start
```
4. The app will run on: [Link](http://localhost:3000)

### 4. Database Schema
1. books collection/table:
| Field          | Type   | Description                 |
| -------------- | ------ | --------------------------- |
| title          | String | Book title                  |
| price          | Number | Book price                  |
| availability   | String | Stock availability          |
| rating         | Number | Book rating (1-5)           |
| detail\_url    | String | Link to book details page   |
| thumbnail\_url | String | URL to book thumbnail image |

### 4. Working Link:
[Project}(https://book-explorer-xi.vercel.app/)
