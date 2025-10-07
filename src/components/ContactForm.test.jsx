import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "./ContactForm";

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

const fillContactForm = async ({ name, email, message }) => {
  const nameInput = screen.getByTestId("name-input");
  const emailInput = screen.getByTestId("email-input");
  const messageInput = screen.getByTestId("message-input");
  if (name) {
    await userEvent.type(nameInput, name);
  }
  if (email) {
    await userEvent.type(emailInput, email);
  }
  if (message) {
    await userEvent.type(messageInput, message);
  }
};

const submitContactForm = async () => {
  const buttonSubmit = screen.getByRole("button", { name: /submit/i });
  await userEvent.click(buttonSubmit);
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactForm", () => {
  test("renders the form initially", () => {
    renderWithClient(<ContactForm />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /contact us/i }),
    ).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  test("submits and shows success state", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithClient(<ContactForm />);

    await fillContactForm({
      name: "Alice",
      email: "alice@example.com",
      message: "Hello",
    });

    await submitContactForm();

    const element = await screen.findByText(/message sent/i);
    expect(element).toBeInTheDocument();
  });

  test("shows pending state and disables the button while submitting", async () => {
    let resolveFetch;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    vi.spyOn(global, "fetch").mockImplementationOnce(() => fetchPromise);

    renderWithClient(<ContactForm />);

    await fillContactForm({
      name: "Bob",
      email: "bob@example.com",
      message: "Hello",
    });

    await submitContactForm();

    const button = await screen.findByTestId("submit-button", {
      name: /sending.../i,
    });
    expect(button).toBeDisabled();

    resolveFetch({ ok: true, json: async () => ({ success: true }) });
    const element = await screen.findByText(/message sent/i);
    expect(element).toBeInTheDocument();
  });

  test("renders error state when API responds with non-ok", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      statusText: "Bad Request",
    });

    renderWithClient(<ContactForm />);

    await fillContactForm({
      name: "Carol",
      email: "carol@example.com",
      message: "Hello",
    });

    await submitContactForm();

    const element = await screen.findByText(/error: bad request/i);
    expect(element).toBeInTheDocument();
  });

  test("sends the correct payload to the API", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithClient(<ContactForm />);
    const input = {
      name: "Dave",
      email: "dave@example.com",
      message: "Hello",
    };

    await fillContactForm({
      name: input.name,
      email: input.email,
      message: input.message,
    });

    await submitContactForm();

    const element = await screen.findByText(/message sent/i);
    expect(element).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/json");
    const parsed = JSON.parse(init.body);
    expect(parsed).toMatchObject(input);
  });

  test("handles empty input values (edge case)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithClient(<ContactForm />);

    const input = {
      name: "",
      email: "",
      message: "",
    };

    await fillContactForm({
      name: input.name,
      email: input.email,
      message: input.message,
    });

    await submitContactForm();

    const element = await screen.findByText(/message sent/i);
    expect(element).toBeInTheDocument();
  });
});
