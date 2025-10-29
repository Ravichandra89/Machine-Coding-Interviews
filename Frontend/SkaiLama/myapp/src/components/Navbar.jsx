import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const Navbar = () => {
  // consuming context
  const { cartItem } = useContext(CartContext);

  // reduce must RETURN
  const count = cartItem.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        Product Store
      </Link>

      <Link to="/cart" style={styles.cart}>
        🛒 Cart ({count})
      </Link>
    </nav>
  );
};

// ✅ Simple CSS-in-JS styling
const styles = {
  navbar: {
    width: "100%",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#007bff",
    color: "white",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
  },
  cart: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};
