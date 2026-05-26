import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import GNB from "../../Components/GNB";

import useToastStore from "../../store/useToastStore.js";
import useModalStore from "../../store/useModalStore";

function MyPagePosts() {
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);
  const openModal = useModalStore((state) => state.openModal);

  // 상태 관리
  const [posts, setPosts] = useState([]); // 게시글 목록 상태

  // 게시글 목록 데이터 가져오기 (GET)
  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts/");

      console.log("백엔드가 보내준 게시글 목록:", response.data);

      // 백엔드 데이터 + 가상 데이터 (백엔드 구현X)
      const formattedPosts = response.data.map((post) => ({
        id: post.id,
        author: post.nickname || "익명", // 백엔드 구현X, 고정값
        title: post.title,
        content: post.body,
        keywords: [post.category || "없음", post.location || "없음"], // 태그 비어있을 시 고정값 '없음'
        status: "매칭 중", // 고정값
        matchRate: "80%", // 고정값
        price: "14,000", // 고정값
        rawPost: post, // EditPage로 백엔드 데이터를 그대로 넘겨주기 위해 보관
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error("내가 쓴 글 목록 조회 실패:", error);
      showToast("글 목록을 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
      onAccept: async () => {
        // 서버에 삭제 요청 보내기 (DELETE)
        try {
          await api.delete(`/posts/${post.id}/`);

          // 성공 시 상태 업데이트 및 토스트 출력
          setPosts((prev) => prev.filter((p) => p.id !== post.id));
          showToast("삭제되었습니다.");
        } catch (error) {
          console.error("게시글 삭제 실패:", error);
          showToast("게시글 삭제에 실패했습니다.");
        }
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
        {posts.length > 0 ? (
          posts.map((post) => {
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
                        // 수정 페이지로 백엔드 데이터 전달
                        navigate("/mypage/edit", {
                          state: { post: post.rawPost },
                        })
                      }
                      className="text-blue-main bg-blue-bg rounded-full px-5 py-1.5 text-[13px] font-bold shadow-sm transition-transform hover:scale-[1.02] hover:cursor-pointer"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post)}
                      className="bg-gray-3 rounded-full px-5 py-1.5 text-[13px] font-bold text-gray-600 shadow-sm transition-transform hover:scale-[1.02] hover:cursor-pointer"
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
          })
        ) : (
          <div className="text-gray-4 py-20 text-center font-medium">
            작성한 게시글이 없습니다.
          </div>
        )}
      </main>

      <GNB />
    </div>
  );
}

export default MyPagePosts;
