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

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      {mutation.isSuccess ? (
        <h3>Message sent</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input name="name" type="text" placeholder="Name" />
          <input name="email" type="email" placeholder="Email" />
          <textarea name="message" placeholder="Message" />
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Sending..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};
