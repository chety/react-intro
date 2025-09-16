import { useCallback, useState } from "react";

export const useFetchPost = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async ({ url, method, body = {}, headers = {} }) => {
      setIsLoading(true);
      setError(null);
      try {
        const init = {
          method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        };

        const response = await fetch(url, init);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setData(json);
        return json;
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, isLoading, error, execute };
};
