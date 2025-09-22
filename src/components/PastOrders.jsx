import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPastOrders } from "../api";
import { OrderDetails } from "./OrderDetails";

export const PastOrders = () => {
  const [page, setPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30_000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setSelectedOrderId(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {selectedOrderId ? (
        <OrderDetails
          orderId={selectedOrderId}
          setOrderId={setSelectedOrderId}
        />
      ) : null}
    </div>
  );
};
