import { asyncThunkCreate, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axiosClient";

/**
 * create async thunk for :
 *       - Fetching Book Products
 *       - Adding Book
 *       - Update Book
 *       - delete Book
 */

export const fetchData = asyncThunkCreate(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/products?limit=100");
      return response.data.products || [];
    } catch (error) {
      console.error("Error fetching Books", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// addBook thunk
export const addBook = asyncThunkCreate(
  "books/addBook",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/product/add", {
        title: payload.title,
        description: payload.description,
        price: Number(payload.price || 0),
        category: payload.category || "books",
        thumbnail: payload.thumbnail || " ",
      });

      return response.data;
    } catch (error) {
      console.error("Error Adding a Book", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update a Book
export const updateBook = asyncThunkCreate(
  "books/updateBook",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`products/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error("Error updating a book", error);
      return rejectWithValue(error.message?.data || error.message);
    }
  }
);

// delete a book
export const deleteBook = asyncThunkCreate(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting a book", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Creating a Book Slice
const BookSlice = createSlice({
  name: "books",
  initialState: {
    item: [],
    loading: false,
    error: null,
  },
  reducers: {
    // define a reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        // setting item
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      // add Book Extra Reducers
      .addCase(addBook.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.item.unshift = action.payload;
        state.loading = false;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update Book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const ind = state.items.findIndex((it) => it.id === action.payload.id);
        if (ind !== -1)
          state.items[ind] = { ...state.items[ind], ...action.payload };
        state.loading = false;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete a book
      .addCase(deleteBook.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter((it) => it !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default BookSlice.reducer;