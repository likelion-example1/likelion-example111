import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 서버로 요청을 보내기 직전에 토큰 넣기
api.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("auth-storage");

    if (authStorage) {
      try {
        const parsedData = JSON.parse(authStorage);

        const token = parsedData?.state?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("토큰을 보내는 중 오류 발생", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 인터셉터 설정
api.interceptors.response.use(
  (response) => response, // 성공 시 응답 그대로 반환
  (error) => {
    // 오류 발생 시
    if (error.response) {
      const { data } = error.response;

      if (data && typeof data === "object") {
        return Promise.reject(data); // 서버에서 전달된 오류 메시지를 그대로 반환
      }
    }

    // 네트워크 오류나 기타 서버 오류
    return Promise.reject({
      message: "서버 오류가 발생했습니다.",
    });
  },
);

export default api;
