import { Pizza } from "./Pizza";
import { useState, useEffect } from "react";
import { useFetch, useFetchPost } from "../hooks";
import { formatCurrency } from "../utils";
import { Cart } from "./Cart";
import { useOrderContext } from "../context";

export const Order = () => {
  const [selectedPizzaType, setSelectedPizzaType] = useState();
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("M");
  const { data: pizzaTypes, isLoading, error } = useFetch("/api/pizzas");
  const { execute: executeFetch } = useFetchPost();
  const [cart, setCart] = useOrderContext();

  useEffect(() => {
    if (isLoading || error || !pizzaTypes) return;
    setSelectedPizzaType(pizzaTypes[0].id);
  }, [pizzaTypes]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !selectedPizzaType) {
    return <div>Loading...</div>;
  }

  const selectedPizza = pizzaTypes.find(
    (pizzaType) => pizzaType.id === selectedPizzaType,
  );
  const { name, description, image, sizes } = selectedPizza;
  const currentPrice = sizes[selectedPizzaSize];

  const checkout = async () => {
    if (cart.length === 0) return;
    await executeFetch({ url: "/api/order", method: "POST", body: { cart } });
    setCart([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCart([
      ...cart,
      { pizza: selectedPizza, size: selectedPizzaSize, price: currentPrice },
    ]);
  };

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                value={selectedPizzaType}
                onChange={(e) => setSelectedPizzaType(e.target.value)}
              >
                {pizzaTypes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div onChange={(e) => setSelectedPizzaSize(e.target.value)}>
                <span>
                  <input
                    checked={selectedPizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={selectedPizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={selectedPizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            <Pizza name={name} description={description} image={image} />
            <p>{formatCurrency(currentPrice)}</p>
          </div>
        </form>
      </div>
      <Cart cart={cart} checkout={checkout} />
    </div>
  );
};
