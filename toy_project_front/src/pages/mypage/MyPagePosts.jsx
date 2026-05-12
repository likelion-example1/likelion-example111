import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GNB from "../../Components/GNB";

function MyPagePosts() {
  const navigate = useNavigate();

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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림/닫힘 상태
  const [selectedPost, setSelectedPost] = useState(null); // 삭제하려고 선택한 게시글 정보
  const [showToast, setShowToast] = useState(false); // 토스트 알림창 상태

  // 삭제하기 버튼을 눌렀을 때 (모달 열기)
  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // 모달에서 '삭제' 버튼을 눌렀을 때 (실제 삭제 처리)
  const handleConfirmDelete = () => {
    const updatedPosts = posts.filter((post) => post.id !== selectedPost.id);
    setPosts(updatedPosts);

    // 모달 닫기 & 토스트 띄우기
    setIsModalOpen(false);
    setShowToast(true);
  };

  // 토스트 알림창 자동 숨김 처리 (2초 뒤)
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div
      className={`font-sf relative min-h-screen bg-white pt-10 pb-28 ${isModalOpen ? "overflow-hidden" : ""}`}
    >
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
                    className="text-blue-main bg-blue-bg rounded-full px-5 py-1.5 text-[13px] font-bold shadow-sm"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="rounded-full bg-[#CFCFCF] px-5 py-1.5 text-[13px] font-bold text-gray-600 shadow-sm transition-transform hover:scale-[1.02]"
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

      {/* --- 삭제 확인 모달창 --- */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-10">
          <div className="w-full max-w-sm overflow-hidden rounded-[20px] bg-white shadow-xl">
            <div className="px-6 py-10 text-center">
              <p className="text-[18px] leading-relaxed font-bold text-black">
                '{selectedPost.title}' 게시글을
                <br />
                정말 삭제하시겠습니까?
              </p>
            </div>
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)} // 아니오: 모달 닫기
                className="flex-1 border-r border-gray-200 py-4 text-[18px] font-medium text-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete} // 예: 삭제 실행
                className="flex-1 py-4 text-[18px] font-bold text-black"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 삭제 완료 토스트 알림 --- */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2">
          <div className="border-gray-2 rounded-xl border bg-white/90 px-8 py-3 shadow-lg backdrop-blur-sm">
            <p className="text-[15px] font-bold text-[#AFAFAF]">
              삭제되었습니다.
            </p>
          </div>
        </div>
      )}
      <GNB />
    </div>
  );
}

export default MyPagePosts;
