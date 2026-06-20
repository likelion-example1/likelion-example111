import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import ChatRoomCard from "../../Components/ChatRoomCard";
import GNB from "../../Components/GNB";

function ChatListPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("received"); // 탭 상태

  // 지난 매칭 숨기기 여부 (기본값 false = 보여줌)
  const [isPastHidden, setIsPastHidden] = useState(false);

  //  채팅방 목록을 저장할 상태 추가
  const [chats, setChats] = useState([]);

  // 컴포넌트 마운트 시 채팅방 목록 가져오기 (GET /chats/)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await api.get("/chats/");
        console.log("👀 백엔드가 보내준 채팅방 목록:", response.data);
        
        // 데이터가 배열로 정상적으로 올 경우 상태에 저장
        if (Array.isArray(response.data)) {
          setChats(response.data);
        }
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패:", error);
      }
    };
    fetchChats();
  }, []);

  // (추후수정!!) 백엔드 데이터 구조에 맞추어 그룹화 및 매핑 안전장치 처리
  const formattedChats = chats.map((room) => ({
    id: room.id,
    status: room.status || "매칭 중",
    restaurantName: room.restaurantName || room.title || "식당 이름 없음",
    // 백엔드에서 배열이 아닌 단일 문자열로 줄 경우를 대비해 배열화 처리
    locations: Array.isArray(room.locations) ? room.locations : [room.location || "장소 미정"],
    categories: Array.isArray(room.categories) ? room.categories : [room.category || "기타"],
    author: room.author_nickname || room.author || "익명",
    lastMessage: room.lastMessage || room.last_message || "아직 대화가 없습니다.",
    participants: room.participants || [],
    newRequests: room.newRequests || room.new_requests || 0,
    currentAmount: room.currentAmount || room.current_amount || "0",
    targetAmount: room.targetAmount || room.target_amount || "0",
    role: room.role || (room.is_host ? "receiver" : "sender"), // 내가 방장이면 receiver
  }));

  // 현재 탭 및 상태(진행중/지난매칭)에 따라 필터링
  const receivedActiveChats = formattedChats.filter(room => room.role === "receiver" && room.status === "매칭 중");
  const receivedPastChats = formattedChats.filter(room => room.role === "receiver" && room.status !== "매칭 중");
  const sentActiveChats = formattedChats.filter(room => room.role === "sender" && room.status === "매칭 중");
  const sentPastChats = formattedChats.filter(room => room.role === "sender" && room.status !== "매칭 중");

  // 현재 탭에 따라 보여줄 데이터를 결정
  const displayActiveChats =
    activeTab === "received" ? receivedActiveChats : sentActiveChats;
  const displayPastChats =
    activeTab === "received" ? receivedPastChats : sentPastChats;

  // 전체 안 읽은 요청 수 계산
  const totalNewRequests = receivedActiveChats.reduce((sum, room) => sum + room.newRequests, 0);
  
  // 채팅방 클릭 시 해당 방으로 이동하는 함수
  const goToChatRoom = (room) => {
    // 내가 보낸 요청 중 '매칭 중'인 방을 누르면, 초대가 수락되었다고 가정하고 이동 (이후 백엔드 로직 구현 후 수정!!)
    if (room.role === "sender" && room.status === "매칭 중") {
      navigate(`/chat/${room.id}`, { state: { isInvited: true } });
    } else {
      navigate(`/chat/${room.id}`);
    }
  };
  return (
    <div className="font-sf min-h-screen bg-white pb-24">
      <header className="flex items-center px-6 pt-12 pb-4">
        <img
          src="/icons/back.svg"
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-5 w-5 cursor-pointer"
        />
        <h1 className="ml-2 text-xl font-bold text-black">매칭채팅</h1>
      </header>

      {/* 필터링 바 (내가 받은 / 내가 보낸) */}
      <div className="bg-blue-bg flex gap-3 px-6 py-4">
        <button
          onClick={() => setActiveTab("received")}
          className={`relative rounded-xl px-5 py-2 text-[15px] font-bold shadow-sm transition-all ${
            activeTab === "received"
              ? "bg-blue-main text-white"
              : "bg-white text-black"
          }`}
        >
          내가 받은
          {/* 빨간색 알림 배지 */}
          <span className="bg-red absolute -top-1.5 -right-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
            {totalNewRequests}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("sent")}
          className={`relative rounded-xl px-5 py-2 text-[15px] font-bold shadow-sm transition-all ${
            activeTab === "sent"
              ? "bg-blue-main text-white"
              : "bg-white text-black"
          }`}
        >
          내가 보낸
        </button>
      </div>

      <main className="px-6 py-2">
        {/* 진행 중인 채팅방 목록 */}
        <section>
          {displayActiveChats.map((room) => (
            <ChatRoomCard
              key={room.id}
              room={room}
              onClick={() => goToChatRoom(room)}
            />
          ))}
        </section>

        {/* 지난 매칭 타이틀 및 숨기기 버튼 */}
        <div className="mt-4 mb-2 flex justify-end">
          <button
            onClick={() => setIsPastHidden(!isPastHidden)}
            className="text-gray-4 flex items-center gap-1 text-xs font-bold"
          >
            {isPastHidden ? "지난 매칭 보기 ∨" : "지난 매칭 숨기기 ∧"}
          </button>
        </div>
        {/* 클릭할 때마다 isPastHidden 상태가 반대(true<->false)로 바뀜! */}

        {/* 지난 매칭 목록 (isPastHidden이 false일 때만 화면에 나타남) */}
        {!isPastHidden && (
          <section>
            {displayPastChats.map((room) => (
              <ChatRoomCard
                key={room.id}
                room={room}
                onClick={() => goToChatRoom(room)}
              />
            ))}
          </section>
        )}
      </main>

      {/* 바텀 네비게이션 바 */}
      <GNB />
    </div>
  );
}

export default ChatListPage;
