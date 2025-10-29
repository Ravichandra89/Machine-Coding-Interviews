import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./pages/ProductList";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/Navbar"; // optional if you have navbar

export const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};
