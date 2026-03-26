const Input = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <form>
    <input
      type={type} 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    </form>
  );
};

export default Input;