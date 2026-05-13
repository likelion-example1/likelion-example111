import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GNB from "../../Components/GNB";

import useToastStore from "../../store/useToastStore";
import useModalStore from "../../store/useModalStore";

function MyPagePosts() {
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);
  const openModal = useModalStore((state) => state.openModal);

  // mock data
  const initialPosts = [
    {
      id: 1,
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
      author: "김이화",
      title: "카페인중독",
      content: "햅쌀와플 진짜 맛있는데 함께 시켜드실 분 구...",
      keywords: ["디저트 및 음료", "포스코관"],
      status: "매칭 완료",
      matchRate: "100%",
      price: "14,000",
    },
    {
      id: 3,
      author: "김이화",
      title: "Waffle It Up",
      content: "2교시 끝나고 와플잇업에서 배달시키실 분 구...",
      keywords: ["디저트 및 음료", "포스코관"],
      status: "매칭 완료",
      matchRate: "100%",
      price: "14,000",
    },
    {
      id: 4,
      author: "김이화",
      title: "Waffle It Up",
      content: "2교시 끝나고 와플잇업에서 배달시키실 분 구...",
      keywords: ["디저트 및 음료", "포스코관"],
      status: "매칭 완료",
      matchRate: "100%",
      price: "14,000",
    },
  ];

  // 상태 관리
  const [posts, setPosts] = useState(initialPosts); // 게시글 목록 상태

  // 삭제하기 버튼을 눌렀을 때
  const handleDeleteClick = (post) => {
    openModal({
      content: (
        <>
          '{post.title}' 게시글을
          <br />
          정말 삭제하시겠습니까?
        </>
      ),
      showImage: false,
      acceptText: "삭제",
      rejectText: "취소",
      onAccept: () => {
        // '삭제' 버튼을 눌렀을 때
        const updatedPosts = posts.filter((p) => p.id !== post.id);
        setPosts(updatedPosts);

        // 토스트 띄우기
        showToast("삭제되었습니다.");
      },
    });
  };

  return (
    <div className="font-sf relative min-h-screen bg-white pt-10 pb-28">
      {/* 상단 헤더 */}
      <header className="mb-4 flex items-center gap-2 px-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-1">
          <img src="/icons/back.svg" alt="뒤로가기" className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-black">내가 쓴 글</h1>
      </header>

      {/* 총 게시글 개수 표시 */}
      <div className="mb-2 flex justify-end px-6">
        <span className="text-blue-main text-[14px] font-bold">
          총 {posts.length}개의 글
        </span>
      </div>

      <main className="px-6">
        {/* 게시글 리스트 렌더링 */}
        {posts.map((post) => {
          const statusIcon =
            post.status === "매칭 중"
              ? "/icons/Matching.svg"
              : "/icons/MatchComplete.svg";

          return (
            <article
              key={post.id}
              className="border-gray-2 flex justify-between border-b py-6"
            >
              {/* 텍스트 정보 영역 */}
              <div className="flex flex-1 flex-col pr-4">
                {/* 프로필 이미지와 이름 */}
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      src="/images/CharacterProfile.png"
                      alt="프로필"
                      className="h-13 w-13 object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold text-black">
                    {post.author}
                  </span>
                </div>

                {/* 제목과 본문 */}
                <h4 className="mt-4 text-xl font-bold text-black">
                  {post.title}
                </h4>
                <p className="text-gray-4 mt-1 truncate text-xs">
                  {post.content}
                </p>

                {/* 키워드 */}
                <div className="text-blue-main mt-3 flex gap-3 text-sm font-medium">
                  {post.keywords.map((keyword, index) => (
                    <span key={index}>{keyword}</span>
                  ))}
                </div>

                {/* 매칭 상태 정보 */}
                <div className="text-gray-4 mt-3 flex items-center gap-4 text-[11px] font-medium">
                  <img
                    src={statusIcon}
                    alt={post.status}
                    className="h-3 object-contain"
                  />
                  <span>{post.matchRate}</span>
                  <span>{post.price}</span>
                </div>

                {/* 수정하기 / 삭제하기 버튼 */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      navigate("/mypage/edit", { state: { post } })
                    }
                    className="text-blue-main bg-blue-bg rounded-full px-5 py-1.5 text-[13px] font-bold shadow-sm transition-transform hover:scale-[1.02] hover:cursor-pointer"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="bg-gray-3 rounded-full px-5 py-1.5 text-[13px] font-bold text-gray-600 shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    삭제하기
                  </button>
                </div>
              </div>

              {/* 식당 사진 영역 */}
              <div className="bg-gray-2 h-35 w-30 shrink-0 overflow-hidden rounded-lg">
                <img
                  src="/images/FoodPhoto.png"
                  alt="식당 사진"
                  className="h-full w-full object-cover"
                />
              </div>
            </article>
          );
        })}
      </main>

      <GNB />
    </div>
  );
}

export default MyPagePosts;
