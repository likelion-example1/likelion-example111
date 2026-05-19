import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // persist가 알아서 localStorage 값을 읽어옴
      isLoggedIn: false,
      user: null,

      login: (userData) => {
        set({ isLoggedIn: true, user: userData });
      },

      logout: () => {
        set({ isLoggedIn: false, user: null });
      },
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키
    },
  ),
);

export default useAuthStore;
