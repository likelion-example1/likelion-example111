

const Button = ({ onClick, disabled, children }) => {
  const buttonStyle = {
    backgroundColor: "#C6D6F0", 
    color: "#4078cb",          
    border: "none",            
    borderRadius: "10px", 
    padding: "8px 16px", 
    fontWeight: "bold",
    cursor: disabled ? "not-allowed" : "pointer", // 마우스 갖다대면 커서 변경
  };
  return (
    
    <button type="button" onClick={onClick} disabled={disabled} style={buttonStyle}>
      {children}
    </button>

    
  );
}

export default Button;
