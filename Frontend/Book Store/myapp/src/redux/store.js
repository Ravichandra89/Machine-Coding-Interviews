import bookReducer from "./bookSlide.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});
