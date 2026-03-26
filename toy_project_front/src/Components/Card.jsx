const Card = ({ children }) => {
  const Cardstyle = {
    border: "1px solid #c3c3c3",
    borderRadius: "8px",
    padding: "20px",
    margin: "10px",
  };

  return <div style={Cardstyle}>{children}</div>;
};

export default Card;
