export const Pizza = ({ name, description, image }) => {
  return (
    <div className="pizza">
      <h2>{name ?? "Pizza"}</h2>
      <p>{description ?? "Pizza Description"}</p>
      <img src={image ?? "http://picsum.photos/200"} alt={name ?? "Pizza"} />
    </div>
  );
};
