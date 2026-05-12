import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoomCard from "../../Components/ChatRoomCard";
import GNB from "../../Components/GNB";

function ChatListPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("received"); // 탭 상태

  // 지난 매칭 숨기기 여부 (기본값 false = 보여줌)
  const [isPastHidden, setIsPastHidden] = useState(false);

  // 가상의 진행 중인 매칭 데이터
  const receivedActiveChats = [
    {
      id: 101,
      status: "매칭 중",
      restaurantName: "Waffle it up",
      locations: ["포스코관"],
      categories: ["디저트 및 음료"],
      author: "김이화",
      lastMessage: "왈왈: 저는 다 담았습니다!",
      participants: [1, 2, 3, 4],
      newRequests: 3, // 새로운 매칭신청 배지 숫자
      currentAmount: "8,700",
      targetAmount: "14,000",
    },
  ];

  // 가상의 지난 매칭 데이터
  const receivedPastChats = [
    {
      id: 201,
      status: "매칭 완료",
      restaurantName: "사장님 돈가스",
      locations: ["포스코관"],
      categories: ["일식"],
      author: "김이화",
      lastMessage: "감자: 다들 맛있게 드세요!",
      participants: [1, 2, 3, 4],
      newRequests: 0,
      currentAmount: "19,000",
      targetAmount: "17,000",
    },
    {
      id: 202,
      status: "매칭 완료",
      restaurantName: "프레퍼스",
      locations: ["학문관"],
      categories: ["샐러드"],
      author: "김이화",
      lastMessage: "감자: 다들 맛있게 드세요!",
      participants: [1, 2, 3, 4],
      newRequests: 0,
      currentAmount: "19,000",
      targetAmount: "17,000",
    },
  ];

  const sentActiveChats = [
    {
      id: 102,
      status: "매칭 중",
      restaurantName: "Dessert 39",
      locations: ["포스코관"],
      categories: ["디저트 및 음료"],
      author: "아기사자",
      lastMessage: "대화 미리보기 불가능",
      participants: [1, 2, 3, 4],
      newRequests: 0,
      currentAmount: "8,700",
      targetAmount: "14,000",
      role: "sender",
    },
  ];
  const sentPastChats = [
    {
      id: 202,
      status: "매칭 완료",
      restaurantName: "유야케 도쿄",
      locations: ["포스코관"],
      categories: ["일식"],
      author: "yummy",
      lastMessage: "gamja: 잘 찾아갔습니다!",
      participants: [1, 2, 3, 4],
      newRequests: 0,
      currentAmount: "19,000",
      targetAmount: "17,000",
      role: "sender",
    },
    {
      id: 203,
      status: "매칭 완료",
      restaurantName: "훅트 포케",
      locations: ["학문관"],
      categories: ["샐러드"],
      author: "집가고싶다",
      lastMessage: "shushu: 맛있게 드세용",
      participants: [1, 2, 3, 4],
      newRequests: 0,
      currentAmount: "19,000",
      targetAmount: "17,000",
      role: "sender",
    },
  ];

  // 현재 탭에 따라 보여줄 데이터를 결정
  const displayActiveChats =
    activeTab === "received" ? receivedActiveChats : sentActiveChats;
  const displayPastChats =
    activeTab === "received" ? receivedPastChats : sentPastChats;

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
            3
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
