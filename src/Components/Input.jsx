const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      // 기본 스타일 + 추가로 전달받은 className (외부에서 추가!)
      className={`focus:ring-blue-main/20 w-full rounded-md bg-gray-100 px-5 py-4 text-[15px] font-medium text-gray-700 transition-shadow outline-none placeholder:text-gray-400 focus:ring-2 ${className}`}
    />
  );
};

export default Input;
