import { Link, useLocation } from "react-router-dom";

function GNB() {
  // 아이콘 색상 변화를 위해 URL 경로 확인
  const location = useLocation();
  const currentPath = location.pathname;

  // 각 탭이 활성화되어 있는지 확인하는 조건
  const isChatActive = currentPath.startsWith("/chat");
  const isMypageActive = currentPath.startsWith("/mypage");
  const isHomeActive = currentPath === "/";
  return (
    <nav className="font-sf bg-blue-bg fixed bottom-0 left-0 z-50 w-full">
      <ul className="m-0 flex list-none items-center justify-around p-3">
        <li>
          {/* 클릭 시 /chat (채팅 목록) 경로로 이동 */}
          <Link
            to="/chat"
            className="flex flex-col items-center text-white no-underline"
          >
            <img
              src={
                isChatActive
                  ? "/icons/ChatSelected.svg"
                  : "/icons/ChatDefault.svg"
              }
              alt="채팅"
              className="mb-1 h-8 w-8"
            />
            <span className="text-sm">Chat</span>
          </Link>
        </li>
        <li>
          {/* 클릭 시 /home (홈 화면) 경로로 이동 */}
          <Link
            to="/"
            className="flex flex-col items-center text-white no-underline"
          >
            <img
              src={
                isHomeActive
                  ? "/icons/HomeSelected.svg"
                  : "/icons/HomeDefault.svg"
              }
              alt="홈"
              className="mb-1 h-7 w-7"
            />
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
              src={
                isMypageActive
                  ? "/icons/MypageSelected.svg"
                  : "/icons/MypageDefault.svg"
              }
              alt="마이페이지"
              className="mb-1 h-7 w-7"
            />
            <span className="text-sm">MY</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default GNB;
