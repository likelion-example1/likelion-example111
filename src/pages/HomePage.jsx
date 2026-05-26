import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 페이지 이동을 위한 훅
import GNB from "../Components/GNB"; // GNB 컴포넌트 불러오기
import TimelineCard from "../Components/TimelineCard";
import useToastStore from "../store/useToastStore.js";
import api from "../api.js"; // API 함수 불러오기

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToastStore((state) => state.showToast);

  const currentUserId = 101; // 현재 사용자의 고유 ID (WritePage와 동일하게 설정)

  // useState 훅: 서버에서 받아올 가상의 게시글 목록 상태
  // 나중에 게시글이 여러 개로 늘어날 때 map 함수를 사용할 것 (260505_적용함!)
  // 260519 가상의 게시물 삭제함
  const [posts, setPosts] = useState([]);

  // 페이지가 렌더링될 때 서버에서 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // GET /posts/ 로 전체 게시글 요청
        const response = await api.get("/posts/");
        console.log("게시글 목록 불러오기 성공:", response.data);

        // 서버에서 받아온 진짜 데이터를 상태에 저장
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 목록 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // WritePage에서 넘어온 데이터가 있는지 확인
    if (location.state?.newPost) {
      // 새 글을 목록 맨 앞에 추가
      setPosts((prevPosts) => {
        // 이미 방금 쓴 글이 배열에 들어가 있으면 추가하지 않고 그대로 둠
        const isExist = prevPosts.find(
          (post) => post.id === location.state.newPost.id,
        );
        if (isExist) return prevPosts;

        // 없다면 기존 글(prevPosts) 맨 앞에 새 글을 추가
        return [location.state.newPost, ...prevPosts];
      });

      // 토스트 알림 띄우기
      showToast(location.state.message);

      // 사용한 state는 비워주기
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 검색 페이지에서 넘어온 키워드 받기
  const searchKeywords = location.state?.searchKeywords || [];

  // 필터링! 선택된 키워드가 있다면, 해당 키워드를 모두 포함하는 게시글만 걸러내기
  const filteredPosts =
    searchKeywords.length > 0
      ? posts.filter((post) => {
          // 백엔드에서 주는 데이터(수령 장소, 카테고리, 상태)를 하나의 배열로 묶음
          const postTags = [post.location, post.category, post.status];
          // 사용자가 선택한 검색 키워드가 postTags 안에 모두 포함되어 있는지 확인
          return searchKeywords.every((keyword) => postTags.includes(keyword));
        })
      : posts;

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
      </header>

      <main>
        {/* 조건부 렌더링: 검색 키워드가 있을 때와 없을 때 UI 다르게 보여주기 */}
        {searchKeywords.length > 0 ? (
          <div className="-mt-10 mb-2 flex items-center gap-3">
            <h2 className="text-gray-3 text-lg font-bold">검색 결과</h2>
            <img
              src="/icons/SearchResults.svg"
              alt="필터 변경"
              className="h-5 w-5 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
              onClick={() => navigate("/search")} // 필터링 아이콘 누르면 검색창으로!
            />
            <div className="flex flex-wrap gap-2">
              {searchKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="bg-blue-bg rounded-full px-4 py-2 text-xs font-bold text-black shadow-sm"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <h2 className="text-gray-3 -mt-8 mb-6 text-left text-xl font-bold">
            Timeline
          </h2>
        )}

        {/* 타임라인 카드 목록 */}
        <section className="flex flex-col gap-4">
          {/* 전체 posts가 아니라 걸러진 filteredPosts를 보여줌 */}
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              // authorId 대신 백엔드 명세인 host 사용!
              const isMyPost = post.host === currentUserId;
              return (
                <TimelineCard key={post.id} post={post} isMyPost={isMyPost} />
              );
            })
          ) : (
            <div className="text-gray-3 py-10 text-center">
              게시글이 없습니다.
            </div>
          )}
        </section>
      </main>

      {/* 글쓰기 버튼, 글 작성 창으로 이동 */}
      <button
        onClick={() => navigate("/write")}
        className="fixed right-5 bottom-24 z-40 transition-transform hover:scale-105"
      >
        <img src="/icons/Writing.svg" alt="글 쓰기" className="h-20 w-20" />
      </button>

      {/* GNB 컴포넌트로 바텀 네비게이션 바 제작 */}
      <GNB />
    </div>
  );
}

export default HomePage;
