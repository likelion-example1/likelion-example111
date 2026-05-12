const Button = ({ onClick, disabled, children, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-bg text-blue-main disabled:bg-gray-6 disabled:text-gray-2 rounded-xl px-4 py-2 font-bold transition-opacity hover:opacity-80 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
