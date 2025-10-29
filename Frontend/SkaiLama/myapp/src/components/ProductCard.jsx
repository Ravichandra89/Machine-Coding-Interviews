import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const ProductCard = ({ product }) => {
  const { cartItem, addToCart, updateQuantity } = useContext(CartContext);

  const inCart = cartItem.find((p) => p.id === product.id);

  const handleDecrease = () => {
    updateQuantity(product.id, inCart.quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, inCart.quantity + 1);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
        width: "220px",
        margin: "10px",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <h3>{product.title}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <span>⭐ {product.rating}</span>
        <span>💲 {product.price}</span>
      </div>

      {!inCart ? (
        <button
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      ) : (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <button onClick={handleDecrease}>-</button>
          <span>{inCart.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      )}
    </div>
  );
};
