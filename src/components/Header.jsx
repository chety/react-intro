import { useOrderContext } from "../context";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  const [cart] = useOrderContext();
  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Padre Gino's Pizza</h1>
      </Link>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
};
