import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard"; // 리스트에 들어갈 항목들을 카드 컴포넌트로 제작
import GNB from "../../Components/GNB";

export function MyPageHistory() {
  const navigate = useNavigate();

  // 현재 선택된 탭 저장 (기본값: '내가 받은')
  const [activeTab, setActiveTab] = useState("received");

  // 가상의 매칭 내역 데이터 배열
  const historyData = [
    {
      id: 1,
      type: "received", // 내가 받은 탭에 보여질 것
      author: "김이화",
      title: "Waffle It Up",
      content: "2교시 끝나고 와플잇업에서 배달시키실 분 구...",
      keywords: ["디저트 및 음료", "포스코관"],
      status: "매칭 중",
      matchRate: "80%",
      price: "14,000",
    },
    {
      id: 2,
      type: "received",
      author: "김이화",
      title: "아콘스톨",
      content: "저녁시간에 아콘스톨에서 배달시키실 분 구합...",
      keywords: ["한식", "포스코관"],
      status: "매칭 중",
      matchRate: "80%",
      price: "14,000",
    },
    {
      id: 3,
      type: "received",
      author: "김이화",
      title: "카페코지",
      content: "2교시 끝나고 카페코지에서 배달시키실 분 구...",
      keywords: ["디저트 및 음료", "포스코관"],
      status: "매칭 완료",
      matchRate: "80%",
      price: "14,000",
    },

    {
      id: 4,
      type: "sent",
      author: "김이화",
      title: "카페인중독",
      content: "와플 드실 분?!",
      keywords: ["디저트 및 음료", "포스코관"],
      status: "매칭 중",
      matchRate: "80%",
      price: "12,000",
    },
  ];

  // 전체 데이터 중 현재 선택된 탭(activeTab)과 타입이 일치하는 데이터만 걸러내는 함수!
  const filteredData = historyData.filter((post) => post.type === activeTab);

  return (
    <div className="font-sf relative min-h-screen bg-white pt-10 pb-28">
      <header className="mb-4 flex items-center gap-2 px-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-1">
          <img src="/icons/back.svg" alt="뒤로가기" className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-black">나의 매칭내역</h1>
      </header>

      <main>
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

        <section className="px-6">
          {/* 필터링된 매칭 내역 리스트 */}
          {filteredData.length > 0 ? (
            filteredData.map((post) => (
              <HistoryCard key={post.id} post={post} />
            ))
          ) : (
            // 데이터가 없을 때 보여줄 화면 처리
            <div className="text-gray-4 py-16 text-center font-medium">
              매칭 내역이 없습니다.
            </div>
          )}
        </section>
      </main>
      <GNB />
    </div>
  );
}

export default MyPageHistory;
