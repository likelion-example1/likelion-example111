const Button = ({ onClick, disabled, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-bg text-blue-main disabled:bg-gray-6 disabled:text-gray-2 rounded-[35px] px-4 py-2 font-bold transition-opacity hover:opacity-80 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
