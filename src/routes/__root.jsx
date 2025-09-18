import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header, PizzaOfTheDay } from "../components";
import { OrderContextProvider } from "../context";

export const Route = createRootRoute({
  component: () => (
    <>
      <OrderContextProvider>
        <Header />
        <Outlet />
        <PizzaOfTheDay />
      </OrderContextProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
