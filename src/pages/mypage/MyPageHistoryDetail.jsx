import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GNB from "../../Components/GNB";

export function MyPageHistoryDetail() {
  const navigate = useNavigate();

  // URL에서 :postId 부분을 가져오는 useParams 훅
  const { postId } = useParams();

  // 상단 탭 상태
  const [activeTab, setActiveTab] = useState("received");

  // 백엔드가 연결되기 전까지 화면을 띄워줄 가상 데이터
  const postDetail = {
    title: "Waffle It Up",
    author: "김이화",
    date: "2026.04.02 12:36",
    keywords: ["디저트 및 음료", "포스코관"],
    status: "매칭 중",
    matchRate: "80%",
    price: "14,000",
    content:
      "2교시 끝나고 와플잇업에서 배달시키실 분 구합니다! 이번 교시\n끝나고 1시 40분쯤 미리 시킬 생각입니당\n여기 젤라또 그린티쿠키랑 딸기밀크티 새로 나왔는데 맛있어용\n포관 오봉도시락 앞에서 픽업해요!!",
    currentAmount: "13,200",
    targetAmount: "14,000",
    participants: [
      {
        id: 1,
        name: "김이화",
        isMe: true,
        menu: "un gelato",
        price: "4,300원",
      },

      {
        id: 2,
        name: "걍걍걍",
        isMe: false,
        menu: "아메리카노",
        price: "4,800원",
      },

      {
        id: 3,
        name: "학관의노예",
        isMe: false,
        menu: "un gelato",
        price: "4,300원",
      },
    ],
  };

  const statusIcon =
    postDetail.status === "매칭 중"
      ? "/icons/Matching.svg"
      : "/icons/MatchComplete.svg";

  return (
    <div className="font-sf relative min-h-screen bg-white pt-10 pb-28">
      {/* 상단 헤더 영역 */}

      <header className="mb-4 flex items-center gap-2 px-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-1">
          <img src="/icons/back.svg" alt="뒤로가기" className="h-5 w-5" />
        </button>

        <h1 className="text-xl font-bold text-black">나의 매칭내역</h1>
      </header>

      {/* 탭 영역 */}

      <div className="bg-blue-bg flex gap-3 px-6 py-4">
        <button
          onClick={() => setActiveTab("received")}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${
            activeTab === "received"
              ? "bg-blue-main text-white"
              : "bg-white text-black"
          }`}
        >
          내가 받은
        </button>

        <button
          onClick={() => setActiveTab("sent")}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${
            activeTab === "sent"
              ? "bg-blue-main text-white"
              : "bg-white text-black"
          }`}
        >
          내가 보낸
        </button>
      </div>

      {/* 메인 상세 내용 영역 */}

      <main className="px-6 py-6">
        {/* 제목 */}

        <h1 className="mb-4 text-4xl font-bold text-black">
          {postDetail.title}
        </h1>

        {/* 작성자 및 매칭 정보 */}

        <div className="mb-6 flex items-center justify-between">
          {/* 좌측: 프로필 및 날짜 */}

          <div className="flex items-center gap-3">
            <div>
              <img
                src="/images/CharacterProfile.png"
                alt="프로필"
                className="h-15 w-15 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold text-black">
                {postDetail.author}
              </span>

              <span className="text-gray-4 mt-0.5 text-[11px] font-medium">
                {postDetail.date}
              </span>
            </div>
          </div>

          {/* 키워드 및 상태 */}

          <div className="flex flex-col items-end gap-1.5">
            <div className="text-blue-main flex gap-2 text-xs font-bold">
              {postDetail.keywords.map((kw, i) => (
                <span key={i}>{kw}</span>
              ))}
            </div>

            <div className="text-gray-4 flex items-center gap-2 text-[11px] font-bold">
              <img src={statusIcon} alt="상태" className="h-3 object-contain" />

              <span>{postDetail.matchRate}</span>

              <span>{postDetail.price}</span>
            </div>
          </div>
        </div>

        {/* 식당/음식 사진 */}

        <div className="mb-6 flex aspect-4/3 w-130 items-center justify-center overflow-hidden rounded-sm bg-[#d9d9d9]">
          <img
            src="/images/FoodPhoto.png"
            alt="음식 사진"
            className="h-50 w-40 object-cover"
          />
        </div>

        {/* 본문 내용 */}

        <p className="text-[15px] leading-relaxed font-bold whitespace-pre-line text-black">
          {postDetail.content}
        </p>

        {/* 구분선 */}

        <hr className="border-gray-2 my-8" />

        {/* 매칭 참여 유저 섹션 */}

        <div>
          <h3 className="text-blue-main mb-1 font-bold">매칭에 참여한 유저</h3>

          <p className="text-blue-main mb-6 text-right text-[13px] font-bold">
            {postDetail.currentAmount} / {postDetail.targetAmount}
          </p>

          <div className="flex flex-col gap-5">
            {postDetail.participants.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                {/* 프로필 + 이름 */}

                <div className="flex w-1/3 items-center gap-3">
                  <div>
                    <img
                      src="/images/CharacterProfile.png"
                      alt="프로필"
                      className="h-15 w-15 object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-base font-medium text-black">
                      {user.name}
                    </span>

                    {/* me 뱃지 */}

                    {user.isMe && (
                      <span className="mt-1 text-[10px] font-bold text-black">
                        me
                      </span>
                    )}
                  </div>
                </div>

                {/* 메뉴 */}

                <span className="text-gray-4 truncate px-2 text-center text-[13px] font-medium">
                  {user.menu}
                </span>

                {/* 가격 */}

                <span className="text-gray-4 pr-30 text-right text-[13px] font-medium">
                  {user.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <GNB />
    </div>
  );
}

export default MyPageHistoryDetail;
