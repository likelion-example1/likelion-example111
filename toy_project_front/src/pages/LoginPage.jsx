import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  // 사용자가 입력할 ID와 비밀번호를 저장할 상태 입력
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    // 로그인 로직 구현
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    alert(`${id}님 환영합니다!`);
    navigate("/");
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
              className="bg-blue-bg text-blue-main w-32 rounded-full py-2.5 text-[18px] font-bold transition-transform active:scale-95"
            >
              Log in
            </button>
          </div>
        </form>

        {/* 회원가입 링크 */}
        <div className="mt-4 text-center">
          <button
            onClick={handleSignup}
            className="text-[13px] font-medium text-gray-400 underline underline-offset-4"
          >
            회원가입하기
          </button>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
