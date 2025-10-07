import { usePizzaOfTheDay } from "./usePizzaOfTheDay";
import { describe, test, expect, vi, afterEach } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { createElement } from "react";

//This is the ugly way without using renderHook from react-testing-library
function getPizzaOfTheDay() {
  let pizzaObj = null;

  function DummyComponent() {
    pizzaObj = usePizzaOfTheDay();
    return null;
  }
  render(createElement(DummyComponent));
  return pizzaObj;
}

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
describe("usePizzaOfTheDay", () => {
  const testPizza = {
    id: "calabrese",
    name: "The Calabrese Pizza",
    category: "Supreme",
    description:
      "Salami, Pancetta, Tomatoes, Red Onions, Friggitello Peppers, Garlic",
    image: "/public/pizzas/calabrese.webp",
    sizes: { S: 12.25, M: 16.25, L: 20.25 },
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should return null at initial render", async () => {
    //We are using the manual render approach here because we are not using renderHook
    const { pizza, isLoading, error } = getPizzaOfTheDay();
    expect(pizza).toBeNull();
    expect(isLoading).toBe(true);
    expect(error).toBeNull();
  });

  test("should return the pizza of the day", async () => {
    //we are using the fetchMock here because we are  using renderHook
    fetchMock.mockResponseOnce(JSON.stringify(testPizza));
    const { result } = renderHook(() => usePizzaOfTheDay());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pizza).toEqual(testPizza);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/pizza-of-the-day");
  });

  test("should return an error when the API returns an error", async () => {
    const error = new Error("API Error");
    fetchMock.mockRejectOnce(error, {
      status: 500,
    });
    const { result } = renderHook(() => usePizzaOfTheDay());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/pizza-of-the-day");
    expect(result.current.error).toEqual(error);
  });
});
