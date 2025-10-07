import { useMutation } from "@tanstack/react-query";
import { postContact } from "../api";

export const ContactForm = () => {
  const mutation = useMutation({
    mutationFn: (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      return postContact(
        data.get("name"),
        data.get("email"),
        data.get("message"),
      );
    },
  });
  const { mutate, isPending, isSuccess, isError, error } = mutation;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="contact" data-testid="contact-form">
      <h2>Contact Us</h2>
      {isSuccess ? (
        <h3>Message sent</h3>
      ) : (
        <form onSubmit={mutate}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            data-testid="name-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            data-testid="email-input"
          />
          <textarea
            name="message"
            placeholder="Message"
            data-testid="message-input"
          />
          <button
            type="submit"
            disabled={isPending}
            data-testid="submit-button"
          >
            {isPending ? "Sending..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};
