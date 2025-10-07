import { describe, test, expect } from "vitest";
import { Pizza } from "./Pizza";
import { render, screen } from "@testing-library/react";

describe("Pizza", () => {
  test("should render properly", () => {
    render(
      <Pizza
        name="Test Pizza"
        description="Test Description"
        image="/test-pizza.webp"
      />,
    );
    expect(screen.getByText("Test Pizza")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByAltText("Test Pizza")).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test-pizza.webp");
    expect(img.alt).toBe("Test Pizza");
  });

  test("should have default props if no props are passed", () => {
    render(<Pizza />);
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Pizza Description")).toBeInTheDocument();
    expect(screen.getByAltText("Pizza")).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "http://picsum.photos/200");
    expect(img.alt).toBe("Pizza");
  });
});
