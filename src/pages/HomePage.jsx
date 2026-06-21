import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom"; // 페이지 이동을 위한 훅
import GNB from "../Components/GNB"; // GNB 컴포넌트 불러오기
import TimelineCard from "../Components/TimelineCard";
import useToastStore from "../store/useToastStore.js";
import api from "../api.js"; // API 함수 불러오기

import useAuthStore from "../store/useAuthStore.js"; // Zustand 전역 상태 관리

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const { user } = useAuthStore(); 
  const currentUserId = user?.id; // 현재 로그인한 사용자의 ID를 가져옴

  // URL에서 검색 파라미터를 읽어오기
  const queryParams = new URLSearchParams(location.search);
  
  // 화면에 띄워줄 파란색 검색 키워드 칩들을 배열로 만들기
  const searchChips = [];
  queryParams.forEach((value, key) => {
    // 백엔드 명세인 '디저트_음료'를 프론트 용으로 이름 수정
    if (value === "디저트_음료") searchChips.push("디저트 및 음료");
    else searchChips.push(value);
  });

  // 기존 useState와 useEffect를 완전히 대체하는 useQuery
  const { data: posts = [], isLoading } = useQuery({ 
    // 키값에 location.search를 넣으면 검색어가 바뀔 때마다 다시 API를 호출
    queryKey: ['posts', location.search], 
    queryFn: async () => {
      const response = await api.get(`/posts/${location.search}`);
      console.log("게시글 목록 불러오기 성공:", response.data);

      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.posts)) {
        return response.data.posts;
      }
      return [];
    }
  });

  // React Query 캐시 업데이트 방식 적용
  useEffect(() => {
    // WritePage에서 넘어온 데이터가 있는지 확인
    if (location.state?.newPost) {
      // 서버에서 새로 불러오기 전에 상단에 새 글 넣기
      queryClient.setQueryData(['posts', location.search], (oldPosts) => {
        if (!oldPosts) return [location.state.newPost];
        const isExist = oldPosts.find((post) => post.id === location.state.newPost.id);
        if (isExist) return oldPosts;
        return [location.state.newPost, ...oldPosts];
      });

      // 토스트 알림 띄우기
      showToast(location.state.message);

      // 사용한 state는 비워주기
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // filteredPosts는 삭제 

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
       {/* searchKeywords 대신 searchChips 배열 사용 */}
        {searchChips.length > 0 ? (
          <div className="-mt-10 mb-2 flex items-center gap-3">
            <h2 className="text-gray-3 text-lg font-bold">검색 결과</h2>
            <img
              src="/icons/SearchResults.svg"
              alt="필터 변경"
              className="h-5 w-5 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
              onClick={() => navigate("/search")} 
            />
            <div className="flex flex-wrap gap-2">
              {searchChips.map((kw, i) => (
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
          {/* 로딩 중일 때 빈 화면 대신 텍스트 */}
          {isLoading ? (
            <div className="text-gray-3 py-10 text-center">
              게시글을 불러오는 중입니다...
            </div>
          ) : 
          posts.length > 0 ? (
            posts.map((post) => {
              const isMyPost = post.host === currentUserId;
              return (
                <TimelineCard key={post.id} post={post} isMyPost={isMyPost} />
              );
            })
          ) : (
            <div className="text-gray-3 py-10 text-center">
              조건에 맞는 게시글이 없습니다.
            </div>
          )}
        </section>
      </main>

      {/* 글쓰기 버튼, 글 작성 창으로 이동 */}
      <div className="fixed bottom-45 left-1/2 z-40 w-full max-w-120 -translate-x-1/2 pointer-events-none">
        
        <button
          onClick={() => navigate("/write")}
          className="absolute right-5 pointer-events-auto transition-transform hover:scale-105"
        >
          <img src="/icons/Writing.svg" alt="글 쓰기" className="h-20 w-20" />
        </button>

        </div>

      {/* GNB 컴포넌트로 바텀 네비게이션 바 제작 */}
      <GNB />
    </div>
  );
}

export default HomePage;
