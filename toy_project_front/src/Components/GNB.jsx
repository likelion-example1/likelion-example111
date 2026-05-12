import { Link } from "react-router-dom";

function GNB() {
  return (
    <nav className="font-sf bg-blue-bg fixed bottom-0 left-0 z-50 w-full">
      <ul className="m-0 flex list-none items-center justify-around p-3">
        <li>
          {/* 클릭 시 /chat (채팅 목록) 경로로 이동 */}
          <Link
            to="/chat"
            className="flex flex-col items-center text-white no-underline"
          >
            <img src="/icons/ChatDefault.svg" alt="채팅" className="h-6 w-6" />
            <span className="text-sm">Chat</span>
          </Link>
        </li>
        <li>
          {/* 클릭 시 /home (홈 화면) 경로로 이동 */}
          <Link
            to="/"
            className="flex flex-col items-center text-white no-underline"
          >
            <img src="/icons/HomeDefault.svg" alt="홈" className="h-6 w-6" />
            <span className="text-sm">Home</span>
          </Link>
        </li>
        <li>
          {/* 클릭 시 /mypage (마이페이지 메인) 경로로 이동 */}
          <Link
            to="/mypage"
            className="flex flex-col items-center text-white no-underline"
          >
            <img
              src="/icons/MypageDefault.svg"
              alt="마이페이지"
              className="h-6 w-6"
            />
            <span className="text-sm">Mypage</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default GNB;
