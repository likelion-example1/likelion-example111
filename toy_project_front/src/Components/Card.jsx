const Card = ({ children }) => {
  return (
    <article className="bg-gray-2 no-border rounded-2xl p-5 shadow-md">
      {children}
    </article>
  );
};

export default Card;
