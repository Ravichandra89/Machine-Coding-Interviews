import React, { useState } from "react";

export const BookForm = ({ initial = {}, onSubmit, submitLabel = "Save" }) => {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    price: initial.price ?? "",
    category: initial.category || "",
    thumbnail: initial.thumbnail || "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault(); // ✅ Fixed (case sensitive)

    // Basic Validation
    if (!form.title.trim()) {
      alert("Title Required");
      return;
    }

    onSubmit(form);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} style={formStyle}>
      <label style={labelStyle}>
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: 100 }}
        />
      </label>

      <label style={labelStyle}>
        Price
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Category
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Thumbnail URL
        <input
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <button type="submit" style={submitBtn}>
        {submitLabel}
      </button>
    </form>
  );
};

// ✅ Inline Styling (simple, clean form UI)
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  width: "100%",
  maxWidth: "600px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  color: "#333",
  fontWeight: 600,
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginTop: "6px",
  fontSize: "14px",
};

const submitBtn = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  transition: "0.2s",
};
