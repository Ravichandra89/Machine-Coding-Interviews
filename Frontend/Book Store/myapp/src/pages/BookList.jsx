import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteBook } from "../redux/bookSlice";
import { BookCard } from "../component/BookCard";
import { Link } from "react-router-dom";

export const BookList = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.books);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Fetch books initially
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // ✅ Filtering Logic
  const filteredBooks = items
    .filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    .filter((book) =>
      category ? book.category.toLowerCase() === category.toLowerCase() : true
    );

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>📚 Book Store</h2>

      {/* Search + Add Button */}
      <div style={topBar}>
        <input
          type="text"
          placeholder="Search book by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={searchStyle}
        />

        <Link to="/add-book" style={linkStyle}>
          + Add Book
        </Link>
      </div>

      {/* Category Filter */}
      <div style={filterWrapper}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={filterSelect}
        >
          <option value="">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="programming">Programming</option>
          <option value="history">History</option>
          <option value="education">Education</option>
        </select>

        <button onClick={() => setCategory("")} style={resetBtn}>
          Reset Filter
        </button>
      </div>

      {/* Loading/Error State */}
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Books Grid */}
      <div style={gridStyle}>
        {filteredBooks.length === 0 ? (
          <p>No Books Found</p>
        ) : (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={() => dispatch(deleteBook(book.id))}
            />
          ))
        )}
      </div>
    </div>
  );
};

/* CSS Styles */
const containerStyle = {
  width: "90%",
  margin: "auto",
  paddingTop: "20px",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const searchStyle = {
  padding: "10px",
  width: "250px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const filterWrapper = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginBottom: "20px",
};

const filterSelect = {
  padding: "8px",
  borderRadius: "6px",
};

const resetBtn = {
  padding: "8px 14px",
  background: "#ff4d4f",
  color: "white",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

const linkStyle = {
  padding: "8px 16px",
  background: "#007bff",
  color: "white",
  textDecoration: "none",
  borderRadius: "8px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};
