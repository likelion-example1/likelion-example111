const TextArea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", height: "80px", 
        backgroundColor: "#F2F2F2", padding: "16px",
        border: "none", borderRadius: "12px", fontSize: "14px", resize: "none" }}
    />
  );
};

export default TextArea;