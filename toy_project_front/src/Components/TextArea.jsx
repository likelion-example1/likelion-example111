const TextArea = ({ value, onChange, placeholder }) => {
  return (
    <form>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "500px", height: "80px" }}
    />
    </form>
  );
};

export default TextArea;