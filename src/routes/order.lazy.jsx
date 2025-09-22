import { createLazyFileRoute } from "@tanstack/react-router";
import { Order } from "../components";

export const Route = createLazyFileRoute("/order")({
  component: Order,
  errorComponent: () => (
    <div>Something went wrong. Please try again later.</div>
  ),
});
