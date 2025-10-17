import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Header } from "./Header";
import { OrderContext } from "../context";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const renderHeaderComponent = (state = [[], () => {}]) => {
  const rootRoute = createRootRoute({
    component: () => (
      <OrderContext.Provider value={state}>
        <Header />
      </OrderContext.Provider>
    ),
  });
  const router = createRouter({
    routeTree: rootRoute,
  });
  return { screen: render(<RouterProvider router={router}></RouterProvider>) };
};
describe("Header", () => {
  test("should render the cart with 0 items", async () => {
    const { screen } = renderHeaderComponent();
    const itemsInCart = screen.getByTestId("cart-number");

    await expect.element(itemsInCart).toBeInTheDocument();
    await expect.element(itemsInCart).toHaveTextContent("0");
  });

  test("should render the cart with 1 item", async () => {
    const { screen } = renderHeaderComponent([
      [{ pizza: { name: "Test Pizza" }, size: "M", price: 10 }],
      () => {},
    ]);
    const itemsInCart = screen.getByTestId("cart-number");

    await expect.element(itemsInCart).toBeInTheDocument();
    await expect.element(itemsInCart).toHaveTextContent("1");
  });
});
