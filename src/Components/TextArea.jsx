const TextArea = ({ value, onChange, placeholder, rows = 5 }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="focus:ring-blue-main/20 w-full resize-none rounded-md bg-gray-100 p-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2"
    />
  );
};

export default TextArea;
