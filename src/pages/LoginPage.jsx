import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 전역 상태
import useAuthStore from "../store/useAuthStore.js";
import useToastStore from "../store/useToastStore.js";
// API 연동
import api from "../api.js";

function LoginPage() {
  // 사용자가 입력할 ID와 비밀번호를 저장할 상태 입력
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // 로딩 상태를 관리할 state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Zustand 액션 가져오기
  const login = useAuthStore((state) => state.login);
  const showToast = useToastStore((state) => state.showToast);

  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    // ID나 패스워드 중 하나라도 비어있으면 토스트 띄우기
    if (!id || !pw) {
      showToast("ID와 패스워드를 입력해주세요.");
      return;
    }

    setIsLoading(true); // 실제 서버에서 정보 가져올 때 로딩 창 띄움

    try {
      // 백엔드 서버로 로그인 요청 (POST)
      const response = await api.post("/accounts/login/", {
        id: id,
        pw: pw,
      });

      console.log("로그인 상태", response.data);

      const receivedToken = response.data.token || response.data.access;

      // 로그인 성공 시 유저 정보와 토큰 스토어에 저장
      login({ id: id }, receivedToken);

      // 로그인 성공 시 전역 상태 업데이트 및 홈으로 이동
      showToast(`${id}님 환영합니다!`);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패", error);

      // 서버에서 보내준 에러 메시지가 있다면 띄워주고, 없다면 기본 메시지 출력
      const errorMessage = error.response?.data?.message || (
        <p>
          로그인에 실패했습니다. <br />
          아이디와 비밀번호를 확인해주세요.
        </p>
      );
      showToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="font-sf flex min-h-screen flex-col items-center bg-white px-8 pt-32">
      <header className="mb-20 text-center">
        <h1 className="text-blue-main text-[32px] leading-tight font-bold">
          Welcome to
          <br />
          한바구니
        </h1>
      </header>

      <main className="w-full max-w-sm">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* ID 입력창 */}
          <div className="relative">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-xl bg-gray-100 py-4 pr-12 pl-5 text-[15px] font-medium text-gray-700 outline-none placeholder:text-gray-400"
            />
            {/* X 아이콘: 클릭 시 입력값 초기화 */}
            <img
              src="/icons/Cancel.svg"
              alt="clear"
              onClick={() => setId("")}
              className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer opacity-40"
            />
          </div>

          {/* PW 입력창 */}
          <div className="relative">
            <input
              type="password"
              placeholder="PW"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full rounded-xl bg-gray-100 py-4 pr-12 pl-5 text-[15px] font-medium text-gray-700 outline-none placeholder:text-gray-400"
            />
            {/* X 아이콘: 클릭 시 입력값 초기화 */}
            <img
              src="/icons/Cancel.svg"
              alt="clear"
              onClick={() => setPw("")}
              className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer opacity-40"
            />
          </div>

          {/* 로그인 버튼 */}
          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              className="bg-blue-bg text-blue-main w-32 rounded-full py-2.5 text-[18px] font-bold transition-transform hover:scale-[1.02] hover:cursor-pointer active:scale-95"
            >
              Log in
            </button>
          </div>
        </form>

        {/* 회원가입 링크 */}
        <div className="mt-4 text-center">
          <button
            onClick={handleSignup}
            className="hover:text-blue-main text-[13px] font-medium text-gray-400 underline underline-offset-4 hover:cursor-pointer"
          >
            회원가입하기
          </button>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
