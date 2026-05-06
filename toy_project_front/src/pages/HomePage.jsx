import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import GNB from "../Components/GNB"; // GNB 컴포넌트 불러오기
import Card from "../Components/Card"; // 만들어둔 공통 컴포넌트
import Button from "../Components/Button";
import TimelineCard from "../Components/TimelineCard";

function HomePage() {
  const navigate = useNavigate();

  // useState 훅: 서버에서 받아올 가상의 게시글 목록 상태
  // 나중에 게시글이 여러 개로 늘어날 때 map 함수를 사용할 것 (260505_적용함!)
  const [posts, setPosts] = useState([
    {
      id: 1,
      restaurantName: "영미김밥",
      lastMessage: "저는 다 담았습니다!",
      participants: [1, 2, 3], // 동그라미 3개
      keywords: ["디저트 및 음료", "포스코관"],
      currentAmount: "8,700",
      targetAmount: "14,000",
    },
    {
      id: 2,
      restaurantName: "영천닭강정",
      lastMessage: "간장맛이요!!",
      participants: [1, 2, 3],
      keywords: ["디저트 및 음료", "포스코관"],
      currentAmount: "8,700",
      targetAmount: "14,000",
    },
    {
      id: 3,
      restaurantName: "피자초이",
      lastMessage: "어떤 맛이 제일 맛있나요..?",
      participants: [1, 2, 3],
      keywords: ["디저트 및 음료", "포스코관"],
      currentAmount: "8,700",
      targetAmount: "14,000",
    },
  ]);

  return (
    <div className="font-sf px-8 pb-24">
      {/* 홈 타이틀 */}
      <header className="pt-12 pb-6 text-center">
        <h1 className="pb-5 text-3xl font-semibold text-black">Home</h1>
        {/* 검색창 컴포넌트 */}
        <div
          className="bg-blue-bg mb-8 flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 shadow-sm"
          onClick={() => navigate("/search")}
        >
          <span
            className="text-blue-main readOnly text-sm font-medium"
            readOnly
          >
            검색어를 입력해주세요.
          </span>
          <img src="/icons/Search.svg" alt="검색" className="h-5 w-5" />
        </div>
        {/* 타임라인 타이틀 */}
        <h2 className="text-gray-3 -mt-2 -mb-6 text-left text-xl font-bold">
          Timeline
        </h2>
      </header>
      <main>
        {/* 타임라인 카드 컴포넌트 */}
        <section className="flex flex-col gap-4">
          {/* 배열 데이터(posts)를 map 함수를 사용해 반복 */}
          {posts.map((post) => (
            <TimelineCard key={post.id} post={post} />
          ))}
        </section>
      </main>

      {/* 글쓰기 버튼, 글 작성 창으로 이동 */}
      <button
        onClick={() => navigate("/write")}
        className="fixed right-5 bottom-24 z-40 transition-transform hover:scale-105"
      >
        <img
          src="/icons/Writing.svg"
          alt="글 쓰기"
          className="h-20 w-20"
          drop-shadow-md
        />
      </button>
      {/* GNB 컴포넌트로 바텀 네비게이션 바 제작 */}
      <GNB />
    </div>
  );
}

export default HomePage;
