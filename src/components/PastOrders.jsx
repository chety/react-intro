import { useState, use, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPastOrders } from "../api";
import { OrderDetails } from "./OrderDetails";
import ErrorBoundary from "./ErrorBoundary";

const PastOrdersInternal = ({ page, setPage, promise }) => {
  const data = use(promise);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

export const PastOrders = () => {
  const [page, setPage] = useState(1);
  const { promise } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30_000,
  });

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading past orders...</h2>
          </div>
        }
        errorElement={(error) => <div>Error: {error.toString()}</div>}
      >
        <PastOrdersInternal page={page} setPage={setPage} promise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
};
