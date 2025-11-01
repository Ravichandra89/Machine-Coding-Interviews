// src/pages/AddBook.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../redux/bookSlice";
import { BookForm } from "../components/BookForm";
import { useNavigate } from "react-router-dom";

export const AddBook = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.books);
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    await dispatch(addBook(formData));
    navigate("/");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Add New Book</h2>
      <BookForm onSubmit={handleAdd} submitLabel={loading ? "Saving..." : "Add Book"} />
    </div>
  );
};
