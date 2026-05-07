import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  // 4개의 입력창을 위한 상태 입력
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  // ID 중복확인 버튼 클릭 시 실행될 함수
  const handleCheckDuplicate = () => {
    if (id === "") {
      alert("ID를 먼저 입력해주세요.");
      return;
    }
    // 실제 중복 여부 확인하는 로직은 나중에
    alert("사용 가능한 ID입니다!");
  };

  // 회원가입 버튼 클릭 시 실행될 함수
  const handleSignup = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (pw !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
      // 일치하지 않으면 아래 코드가 실행되지 않고 함수 종료
    }

    if (!id || !pw || !passwordConfirm || !userName) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 모든 조건이 맞으면 가입 성공 알림 후 로그인 페이지로 이동
    alert("회원가입이 완료되었습니다! 로그인해주세요.");
    navigate("/login");
  };

  return (
    <div className="font-sf flex min-h-screen flex-col items-center bg-white px-8 pt-20 pb-20">
      <header className="mb-16 text-center">
        <h1 className="text-blue-main text-[32px] leading-tight font-bold">
          Welcome to <br /> 한바구니
        </h1>
      </header>
      <main className="w-full max-w-sm">
        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          {/* ID 입력창 */}
          <div className="flex flex-col items-end gap-1">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-xl bg-gray-100 py-4 pr-12 pl-5 text-[15px] font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />
              <img
                src="/icons/Cancel.svg"
                alt="clear"
                onClick={() => setId("")}
                className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer opacity-40"
              />
            </div>
            <button
              type="button"
              onClick={handleCheckDuplicate}
              className="pr-1 text-[11px] font-medium text-gray-400 underline underline-offset-2"
            >
              아이디 중복확인
            </button>
          </div>

          {/* 비밀번호 입력창 */}
          <div className="flex flex-col items-end gap-1">
            <div className="relative w-full">
              <input
                type="password"
                placeholder="PW"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded-xl bg-gray-100 py-4 pr-12 pl-5 text-[15px] font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />
              <img
                src="/icons/Cancel.svg"
                alt="clear"
                onClick={() => setPw("")}
                className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer opacity-40"
              />
            </div>
            <span className="pr-1 text-[11px] font-medium text-gray-400">
              ! 특수문자, 숫자 포함
            </span>
          </div>

          {/* 비밀번호 확인 입력창 */}
          <div className="relative w-full">
            <input
              type="password"
              placeholder="PW 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full rounded-xl bg-gray-100 py-4 pr-12 pl-5 text-[15px] font-medium text-gray-700 outline-none placeholder:text-gray-400"
            />
            <img
              src="/icons/Cancel.svg"
              alt="clear"
              onClick={() => setPasswordConfirm("")}
              className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer opacity-40"
            />
          </div>

          {/* User Name 입력창 */}
          <div className="relative mb-10 w-full">
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-xl bg-gray-100 py-4 pr-12 pl-5 text-[15px] font-medium text-gray-700 outline-none placeholder:text-gray-400"
            />
            <img
              src="/icons/Cancel.svg"
              alt="clear"
              onClick={() => setUserName("")}
              className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer opacity-40"
            />
          </div>

          {/* 회원가입 버튼 */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-bg text-blue-main w-40 rounded-full py-3 text-[18px] font-bold shadow-sm transition-transform active:scale-95"
            >
              회원가입
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignupPage;
