import { create } from "zustand";

const useToastStore = create((set) => ({
  show: false,
  message: "",

  // 토스트 띄우기 (메시지를 받아 상태 업데이트)
  showToast: (msg) => set({ show: true, message: msg }),

  // 토스트 닫기
  closeToast: () => set({ show: false, message: "" }),
}));

export default useToastStore;
