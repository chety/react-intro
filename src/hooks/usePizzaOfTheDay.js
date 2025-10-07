import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizza, setPizza] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/pizza-of-the-day")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setPizza(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { pizza, isLoading, error };
};
