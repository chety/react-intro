import { createLazyFileRoute } from "@tanstack/react-router";
import { ContactForm } from "../components";
export const Route = createLazyFileRoute("/contact")({
  component: ContactForm,
});
