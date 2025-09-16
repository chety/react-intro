import { useFetch } from "../hooks";
import { formatCurrency } from "../utils";

export const PizzaOfTheDay = () => {
  const { data, isLoading, error } = useFetch("/api/pizza-of-the-day");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const { name, description, image, sizes } = data;

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <p className="pizza-of-the-day-price">
            From: {formatCurrency(sizes["S"])}
          </p>
        </div>
        <img src={image} alt={name} className="pizza-of-the-day-image" />
      </div>
    </div>
  );
};
