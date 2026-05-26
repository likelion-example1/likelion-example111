import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import GNB from "../../Components/GNB";
import MatchCount from "../../Components/MatchCountBar";

function MyPageMain() {
  const navigate = useNavigate();

  // 프로필 상태 관리 (기본 고정값)
  const [user, setUser] = useState({
    name: "",
    matchCount: 3, // API 구현 전까지는 일단 3회로 고정. 추후 수정.
  });

  // 컴포넌트가 열릴 때 프로필 데이터 가져오기 (GET)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/accounts/profile/");
        console.log("백엔드가 보내준 프로필 데이터:", response.data);

        setUser((prev) => ({
          ...prev,
          // 백엔드에서 준 nickname 혹은 name이 있으면 그걸 쓰고, 없으면 공백 처리
          name: response.data.nickname || response.data.name || "",
        }));
      } catch (error) {
        console.error("마이페이지 프로필 조회 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="font-sf relative min-h-screen bg-white px-6 pt-10 pb-28">
      {/* 헤더: 뒤로가기 버튼 + 타이틀 */}
      <header className="mb-6 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-1">
          <img src="/icons/back.svg" alt="뒤로가기" className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-medium text-black">마이페이지</h1>
      </header>

      <main>
        <section>
          {/* 프로필 이름 및 프로필 사진(캐릭터) */}
          <h2 className="text-blue-main text-center text-4xl font-bold">
            {user.name}
          </h2>
          <div className="mb-8 flex justify-center">
            <img
              src="/images/HanBagunni.png"
              alt="프로필 캐릭터"
              className="-mt-10 -mb-15 h-100 w-100 object-contain drop-shadow-md"
            />
          </div>
        </section>

        {/* 매칭 횟수 진행바 */}
        <section className="mb-4 pb-8">
          {/* 가상 데이터인 matchCount(3)을 하위 컴포넌트로 전달 */}
          <MatchCount currentCount={user.matchCount} />
        </section>

        {/* 메뉴 버튼 영역 */}
        <section className="flex flex-col gap-4">
          {/* 계정 정보 버튼 클릭 시 이동 */}
          <button
            onClick={() => navigate("/mypage/account")}
            className="bg-blue-bg flex items-center justify-between rounded-2xl px-6 py-5 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <span className="text-gray-8 text-lg font-bold">계정 정보</span>
            <img
              src="/icons/AccountInfo.svg"
              alt="계정 정보"
              className="h-10 w-10"
            />
          </button>

          <div className="grid grid-cols-2 gap-4">
            {/* 나의 매칭 내역 버튼 클릭 시 이동 */}
            <button
              onClick={() => navigate("/mypage/history")}
              className="bg-blue-bg relative flex h-36 flex-col rounded-2xl p-5 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <span className="text-gray-8 mt-5 text-left text-lg font-bold whitespace-pre-line">
                나의{"\n"}매칭 내역
              </span>
              <img
                src="/icons/UsersGroup.svg"
                alt="나의 매칭 내역"
                className="absolute mt-6 h-13 w-13 self-end"
              />
            </button>

            {/* 나의 게시물 버튼 클릭 시 이동 */}
            <button
              onClick={() => navigate("/mypage/posts")}
              className="bg-blue-bg flex h-36 flex-col justify-between rounded-2xl p-5 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <span className="text-gray-8 mt-5 text-left text-lg font-bold whitespace-pre-line">
                나의{"\n"}게시물
              </span>
              <img
                src="/icons/NoteEdit.svg"
                alt="나의 게시물"
                className="absolute mt-6 h-12 w-12 self-end"
              />
            </button>
          </div>
        </section>
      </main>

      <GNB />
    </div>
  );
}

export default MyPageMain;
