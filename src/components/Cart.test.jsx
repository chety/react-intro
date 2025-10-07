import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";
import userEvent from "@testing-library/user-event";
import { formatCurrency } from "../utils";

describe("Cart", () => {
  test("snapshot test", () => {
    const { asFragment } = render(<Cart cart={[]} checkout={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render with items and call checkout", async () => {
    const checkOutMock = vi.fn();
    const cartItems = [
      {
        pizza: {
          name: "Fungi Pizza",
        },
        size: "M",
        price: 10,
      },
      {
        pizza: {
          name: "Cheese Pizza",
        },
        size: "L",
        price: 15,
      },
    ];
    render(<Cart cart={cartItems} checkout={checkOutMock} />);
    cartItems.forEach((item) => {
      expect(screen.getByText(item.pizza.name)).toBeInTheDocument();
      expect(screen.getByText(item.size)).toBeInTheDocument();
      expect(screen.getByText(formatCurrency(item.price))).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /checkout/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    await userEvent.click(button);

    expect(checkOutMock).toHaveBeenCalled();
  });
});
