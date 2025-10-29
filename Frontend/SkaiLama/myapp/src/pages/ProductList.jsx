import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products); // ✅ products array
      } catch (error) {
        console.error("Unable to fetch Product Data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
