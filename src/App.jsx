import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import useToastStore from "./store/useToastStore.js";

// 전역 상태 관리
import Toast from "./Components/Toast";
import Modal from "./Components/Modal";

// 일반 페이지 불러오기
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WritePage from "./pages/WritePage";
import SearchPage from "./pages/SearchPage";
import PostDetailPage from "./pages/PostDetailPage";

// 마이페이지 관련 불러오기
import MypageMain from "./pages/mypage/MyPageMain";
import MyPageHistory from "./pages/mypage/MyPageHistory";
import MypageAccount from "./pages/mypage/MyPageAccount";
import MyPagePosts from "./pages/mypage/MyPagePosts";
import MyPageHistoryDetail from "./pages/mypage/MyPageHistoryDetail";
import EditPages from "./pages/mypage/EditPages";

// 채팅 관련 불러오기
import ChatListPage from "./pages/chat/ChatListPage";
import ChatRoomPage from "./pages/chat/ChatRoomPage";

// 리디렉션 로직
// useNavigate 써야 해서 별도 컴포넌트로 분리
function AuthGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 로그인 안 한 사용자가 보호된 홈페이지에 접근할 때
    const publicPaths = ["/login", "/signup"];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (!isLoggedIn && !isPublicPath) {
      showToast("로그인이 필요한 서비스입니다.");
      navigate("/login", { replace: true });
    }

    // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근할 때
    if (isLoggedIn && isPublicPath) {
      navigate("/", { replace: true });
    }

    setIsInitialized(true);
  }, [isLoggedIn, location.pathname, navigate, showToast]);

  // 초기 체크가 끝나기 전에는 아무것도 보여주지 않음
  if (!isInitialized) return null;

  return children;
}

function App() {
  return (
    <div className="bg-white min-h-screen flex justify-center font-sf">
      
      {/* 화면 최대 너비 고정 (GUI가 모바일 화면에 맞게 구현되어 프론트도 동일 적용) */}
      <div className="bg-white w-full max-w-120 min-h-screen relative shadow-lg overflow-hidden">
    <BrowserRouter>
      {/* AuthGuard로 전체 Routes를 감싸서 페이지 이동 시마다 검사 */}
      <AuthGuard>
        {/* 전역 상태 */}
        <Toast />
        <Modal />

        {/* 라우팅 설정 */}
        <Routes>
          {/* 시작 화면 및 메인 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* 부가 기능 */}
          <Route path="/write" element={<WritePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<MypageMain />} />
          <Route path="/mypage/history" element={<MyPageHistory />} />
          <Route path="/mypage/account" element={<MypageAccount />} />
          <Route path="/mypage/posts" element={<MyPagePosts />} />
          <Route
            path="/mypage/history/:postId"
            element={<MyPageHistoryDetail />}
          />
          <Route path="/mypage/edit" element={<EditPages />} />
          {/* 채팅 */}
          <Route path="/chat" element={<ChatListPage />} />
          <Route path="/chat/:roomId" element={<ChatRoomPage />} />{" "}
          {/* :roomId는 특정 채팅방의 고유 ID를 받고 이후에 추가 제작 */}
        </Routes>
      </AuthGuard>
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
