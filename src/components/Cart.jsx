import { formatCurrency } from "../utils";

export const Cart = ({ cart, checkout }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> -
            <span className="type">{item.pizza.name}</span> -
            <span className="price">{formatCurrency(item.price)}</span>
          </li>
        ))}
      </ul>
      <p>Total: {formatCurrency(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};
