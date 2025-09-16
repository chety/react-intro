import { createContext, useContext, useMemo, useState } from "react";

const OrderContext = createContext([[], () => {}]);

export const OrderContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const contextValue = useMemo(() => [cart, setCart], [cart, setCart]);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrderContext must be used within an OrderContextProvider",
    );
  }
  return context;
};
