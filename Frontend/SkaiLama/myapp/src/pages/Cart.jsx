import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const Cart = () => {
  // Consume context
  const { cartItem, updateQuantity } = useContext(CartContext);

  const handleQuantityDecrease = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleQuantityIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  return (
    <div style={styles.container}>
      <h2>🛒 Cart Items</h2>

      {cartItem.length === 0 ? (
        <p>No Cart Item</p>
      ) : (
        cartItem.map((item) => (
          <div key={item.id} style={styles.card}>
            <h3>{item.title}</h3>
            <p>
              {item.price} x <strong>{item.quantity}</strong>
            </p>

            <div style={styles.btnWrapper}>
              <button
                style={styles.btn}
                onClick={() => handleQuantityDecrease(item.id, item.quantity)}
              >
                -
              </button>
              <button
                style={styles.btn}
                onClick={() => handleQuantityIncrease(item.id, item.quantity)}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "auto",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px 15px",
    marginBottom: "12px",
  },
  btnWrapper: {
    display: "flex",
    gap: "10px",
  },
  btn: {
    background: "#007bff",
    padding: "5px 14px",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
  },
};
