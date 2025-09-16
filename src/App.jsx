import { createRoot } from "react-dom/client";
import { Order, PizzaOfTheDay, Header } from "./components";
import { StrictMode } from "react";
import { OrderContextProvider } from "./context";

const App = () => (
  <StrictMode>
    <OrderContextProvider>
      <Header />
      <Order />
      <PizzaOfTheDay />
    </OrderContextProvider>
  </StrictMode>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
