// src/pages/EditBook.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookForm } from "../components/BookForm";
import { useSelector, useDispatch } from "react-redux";
import { updateBook } from "../redux/bookSlice";

export const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const book = useSelector((s) =>
    s.books.items.find((b) => String(b.id) === String(id))
  );

  if (!book) return <p style={{ padding: 24 }}>Book not found.</p>;

  const onSubmit = async (updates) => {
    await dispatch(updateBook({ id: book.id, updates }));
    navigate("/");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Edit Book</h2>
      <BookForm initial={book} onSubmit={onSubmit} submitLabel="Update Book" />
    </div>
  );
};
