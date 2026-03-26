

const Button = ({ onClick, disabled, children }) => {
  return (
    
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>

    
  );
}

export default Button;
