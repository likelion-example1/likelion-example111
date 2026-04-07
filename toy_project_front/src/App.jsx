import { useState } from "react"; // UseState 사용하려면 import 해와야!!
import Card from "./Components/Card";
import Button from "./Components/Button";
import Input from "./Components/Input";
import TextArea from "./Components/TextArea";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 일반 페이지 불러오기
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WritePage from './pages/WritePage';
import SearchPage from './pages/SearchPage';

// 마이페이지 관련 불러오기
import MypageMain from './pages/mypage/MyPageMain';
import MyPageHistory from './pages/mypage/MyPageHistory';
import MypageAccount from './pages/mypage/MyPageAccount';

// 채팅 관련 불러오기
import ChatListPage from './pages/chat/ChatListPage';
import ChatRoomPage from './pages/chat/ChatRoomPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 시작 화면 및 메인 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* 부가 기능 */}
        <Route path="/write" element={<WritePage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MypageMain />} />
        <Route path="/mypage/history" element={<MyPageHistory />} />
        <Route path="/mypage/account" element={<MypageAccount />} />

        {/* 채팅 */}
        <Route path="/chat" element={<ChatListPage />} />
        <Route path="/chat/:roomId" element={<ChatRoomPage />} /> {/* :roomId는 특정 채팅방의 고유 ID를 받고 이후에 추가 제작 */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;