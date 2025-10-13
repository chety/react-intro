import { describe, test, expect, vi, afterEach, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createFetchMock from "vitest-fetch-mock";
import { PastOrders } from "./PastOrders";

// Mock OrderDetails to avoid additional network calls and simplify assertions
vi.mock("./OrderDetails", () => {
  const OrderDetails = ({ orderId }) => (
    <div data-testid="order-details">Order {orderId}</div>
  );
  return { OrderDetails };
});

// Optional: make ErrorBoundary a passthrough in tests
vi.mock("./ErrorBoundary", () => ({
  default: ({ children }) => children,
}));

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function renderWithClient(ui) {
  const client = createTestQueryClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}

const fetchMock = createFetchMock(vi);

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
  fetchMock.mockReset();
});

describe("PastOrders", () => {
  test("shows loading state initially", async () => {
    // keep fetch pending to observe loading state
    fetchMock.mockImplementationOnce(() => new Promise(() => {}));

    renderWithClient(<PastOrders />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error state when API rejects", async () => {
    fetchMock.mockRejectOnce(new Error("API Error"));

    renderWithClient(<PastOrders />);

    const el = await screen.findByText(/error: api error/i);
    expect(el).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/past-orders?page=1");
  });

  test("renders rows and pagination initial state", async () => {
    const orders = Array.from({ length: 10 }).map((_, idx) => ({
      order_id: idx + 1,
      date: `2025-01-${idx + 1}`,
      time: `10:${idx + 1}`,
    }));
    fetchMock.mockResponseOnce(JSON.stringify(orders));

    renderWithClient(<PastOrders />);

    await screen.findByRole("button", { name: orders[0].order_id });

    for (const order of orders) {
      expect(
        screen.getByRole("button", { name: order.order_id }),
      ).toBeInTheDocument();
      expect(screen.getByText(order.date)).toBeInTheDocument();
      expect(screen.getByText(order.time)).toBeInTheDocument();
    }

    const prev = screen.getByRole("button", { name: /previous/i });
    const next = screen.getByRole("button", { name: /next/i });
    expect(prev).toBeDisabled();
    expect(next).toBeEnabled();

    expect(fetchMock).toHaveBeenCalledWith("/api/past-orders?page=1");
  });

  test("paginates to next page and uses correct URLs; disables Next when < 10", async () => {
    const page1 = Array.from({ length: 10 }).map((_, idx) => ({
      order_id: idx + 1,
      date: `2025-02-${String(idx + 1).padStart(2, "0")}`,
      time: `11:${String(idx).padStart(2, "0")}`,
    }));
    const page2 = Array.from({ length: 3 }).map((_, idx) => ({
      order_id: 100 + idx + 1,
      date: `2025-03-0${idx + 1}`,
      time: `12:0${idx}`,
    }));
    fetchMock
      .mockResponseOnce(JSON.stringify(page1)) // page=1
      .mockResponseOnce(JSON.stringify(page2)); // page=2

    renderWithClient(<PastOrders />);

    // first page loaded
    await screen.findByRole("button", { name: page1[0].order_id });
    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/past-orders?page=1");

    const next = screen.getByRole("button", { name: /next/i });
    await userEvent.click(next);

    // second page loaded
    await screen.findByRole("button", { name: page2[0].order_id });
    await screen.findByRole("button", { name: /next/i, disabled: true });
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/past-orders?page=2");

    const prev = screen.getByRole("button", { name: /previous/i });
    expect(prev).toBeEnabled();
  });

  test("clicking an order id shows OrderDetails", async () => {
    const orders = [
      { order_id: 7, date: "2025-04-10", time: "13:00" },
      { order_id: 8, date: "2025-04-11", time: "13:30" },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(orders));

    renderWithClient(<PastOrders />);

    const idButton = await screen.findByRole("button", { name: "7" });
    await userEvent.click(idButton);

    expect(await screen.findByTestId("order-details")).toHaveTextContent(
      /order 7/i,
    );
  });
});
