// src/components/BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export const BookCard = ({ book, onDelete }) => {
  return (
    <div style={cardStyle}>
      <img
        src={
          book.thumbnail ||
          `https://via.placeholder.com/150?text=${encodeURIComponent(
            book.title || "Book"
          )}`
        }
        alt={book.title}
        style={thumbStyle}
      />
      <div style={{ padding: "10px", flex: 1 }}>
        <h3 style={{ margin: "0 0 6px 0" }}>{book.title}</h3>
        <p style={{ margin: "0 0 8px 0", color: "#444", fontSize: 14 }}>
          {book.description?.slice(0, 120) || "No description"}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>${book.price ?? "N/A"}</strong>
          <div>
            <Link to={`/edit/${book.id}`}>
              <button style={editBtn}>Edit</button>
            </Link>
            <button style={delBtn} onClick={() => onDelete(book.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  display: "flex",
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  overflow: "hidden",
  width: "100%",
  maxWidth: 900,
  margin: "12px auto",
};

const thumbStyle = {
  width: 150,
  height: 150,
  objectFit: "cover",
  flexShrink: 0,
};

const editBtn = {
  padding: "6px 10px",
  marginRight: 8,
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const delBtn = {
  padding: "6px 10px",
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
