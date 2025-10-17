import { useMutation } from "@tanstack/react-query";
import { postContact } from "../api";

const InputForm = ({ name, type, placeholder, disabled }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      data-testid={`${name}-input`}
    />
  );
};
export const ContactForm = () => {
  const mutation = useMutation({
    mutationFn: ({ name, email, message }) => {
      return postContact(name, email, message);
    },
  });
  const { isPending, isSuccess, isError, error } = mutation;

  const handleSubmit = async (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    mutation.mutate({ name, email, message });
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="contact" data-testid="contact-form">
      <h2>Contact Us</h2>
      {isSuccess ? (
        <h3>Message sent</h3>
      ) : (
        <form action={handleSubmit}>
          <InputForm
            name="name"
            type="text"
            placeholder="Name"
            disabled={isPending}
          />
          <InputForm
            name="email"
            type="email"
            placeholder="Email"
            disabled={isPending}
          />
          <textarea
            name="message"
            placeholder="Message"
            data-testid="message-input"
            disabled={isPending}
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
