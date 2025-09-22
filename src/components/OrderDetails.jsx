import { useQuery } from "@tanstack/react-query";
import { Modal } from "./Modal";
import { formatCurrency } from "../utils";
import { getOrderDetails } from "../api";
export const OrderDetails = ({ orderId, setOrderId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (isLoading) return <div>Loading Order Details...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Modal>
      <h2>Order #{orderId}</h2>
      <table>
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Size</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {data.orderItems.map((pizza) => (
            <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
              <td>
                <img src={pizza.image} alt={pizza.name} />
              </td>
              <td>{pizza.name}</td>
              <td>{pizza.size}</td>
              <td>{pizza.quantity}</td>
              <td>{formatCurrency(pizza.price)}</td>
              <td>{formatCurrency(pizza.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setOrderId(null)}>Close</button>
    </Modal>
  );
};
