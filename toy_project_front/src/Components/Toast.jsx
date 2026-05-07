import { useEffect } from "react";

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // 2초 뒤에 부모의 상태를 false로 바꿈
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transition-all">
      <div className="rounded-xl bg-white/90 px-8 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-blue-bg text-4 font-bold">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
