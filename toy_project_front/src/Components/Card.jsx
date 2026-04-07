const Card = ({ children }) => {
  const Cardstyle = {
    backgroundColor: "#EFEFEF",
    border: "1px solid #c3c3c3",
    borderRadius: "8px",
    padding: "20px",
    margin: "0 0 16px 0",
  };

  return <div style={Cardstyle}>{children}</div>;
};

export default Card;
