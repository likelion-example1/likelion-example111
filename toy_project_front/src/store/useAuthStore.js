import { create } from "zustand";

// 브라우저의 localStorage에서 기존 로그인 정보를 가져옴
const storedUser = localStorage.getItem("user");

const useAuthStore = create((set) => ({
  // 스토리지 연동 (쿠키) 기능
  // 저장된 정보가 있으면 새로고침해도 바로 true로 초기화
  isLoggedIn: !!storedUser,
  user: storedUser ? JSON.parse(storedUser) : null,

  login: (userData) => {
    // 로그인 시 스토리지에 정보 저장
    localStorage.setItem("user", JSON.stringify(userData));
    set({ isLoggedIn: true, user: userData });
  },

  logout: () => {
    // 로그아웃 시 스토리지에서 정보 삭제
    localStorage.removeItem("user");
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;
