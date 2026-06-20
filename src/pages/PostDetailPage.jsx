import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import GNB from "../Components/GNB";

function PostDetailPage() {
  const navigate = useNavigate();
  // URL에서 :postId 파라미터 가져오기
  const { postId } = useParams();

  // API로 받아올 게시글 데이터를 담을 State
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 백엔드에서 상세 데이터 가져오기 (GET)
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await api.get(`/posts/${postId}/`);
        console.log("게시글 상세 데이터:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("게시글 상세 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) fetchPostDetail();
  }, [postId]);

  // 데이터를 불러오는 중일 때 보여줄 화면
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-bold text-gray-4">
        게시글을 불러오는 중입니다...
      </div>
    );
  }

  // 삭제되었거나 없는 게시글일 경우
  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="font-bold text-gray-4">게시글을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-main font-bold underline"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  // 백엔드 데이터 + 임시 고정값
  const postDetail = {
    title: post.title || "제목 없음",
    author: post.host_nickname || "김이화",
    date: post.date 
      ? new Date(post.date).toLocaleString('ko-KR', { 
          year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' 
        }) : "날짜 정보 없음",
    keywords: [post.category || "없음", post.location || "없음"],
    status: "매칭 중", 
    matchRate: "80%", 
    price: "14,000", 
    content: post.body || "내용이 없습니다.",
    photo: post.photo || "/images/FoodPhoto.png", // 사진이 없으면 기본 이미지
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
        <h1 className="text-xl font-bold text-black">게시글 상세</h1>
      </header>

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

          {/* 우측: 키워드 및 상태 */}
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
        <div className="mb-6 flex aspect-4/3 items-center justify-center overflow-hidden rounded-sm bg-gray-2">
          <img
            src={postDetail.photo}
            alt="음식 사진"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 본문 내용 */}
        <p className="text-5 leading-relaxed font-bold whitespace-pre-line text-black">
          {postDetail.content}
        </p>
      </main>

      <GNB />
    </div>
  );
}

export default PostDetailPage;