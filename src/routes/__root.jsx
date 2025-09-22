import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header, PizzaOfTheDay } from "../components";
import { OrderContextProvider } from "../context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <OrderContextProvider>
        <Header />
        <Outlet />
        <PizzaOfTheDay />
      </OrderContextProvider>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
});
