import { createLazyFileRoute } from "@tanstack/react-router";
import { PastOrders } from "../components";
export const Route = createLazyFileRoute("/past")({
  component: PastOrders,
});
