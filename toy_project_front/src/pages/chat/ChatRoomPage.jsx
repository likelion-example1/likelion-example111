import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import useToastStore from "../../store/useToastStore";
import useModalStore from "../../store/useModalStore";

function ChatRoomPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 :roomId 부분을 가져오는 useParams 훅
  const { roomId } = useParams();

  const showToast = useToastStore((state) => state.showToast);
  const openModal = useModalStore((state) => state.openModal);

  // 채팅 입력창 상태
  const [inputValue, setInputValue] = useState("");

  // 주고받은 채팅 메시지 목록 상태 (isMine이 true면 내가 보낸 것)
  const MOCK_DB = {
    101: {
      title: "Waffle it up",
      role: "receiver",
      requests: [
        { id: 1, name: "diadia" },
        { id: 2, name: "깨비" },
        { id: 3, name: "꿀꿀" },
      ],
      messages: [
        {
          id: 1,
          sender: "율율",
          text: "저 메뉴 골랐어요!",
          isMine: false,
          type: "chat",
        },
        {
          id: 2,
          sender: "왈왈",
          text: "저는 다 담았습니다!",
          isMine: false,
          type: "chat",
        },
        { id: 3, sender: "나", text: "율율님", isMine: true, type: "chat" },
        {
          id: 4,
          sender: "나",
          text: "혹시 젤라또 맛 몇 가지로 시키실 예정이세요?",
          isMine: true,
          type: "chat",
        },
      ],
    },
    102: {
      title: "Dessert 39",
      role: "sender", // 내가 보낸 방이므로 수락 창이 뜨지 않음
      requests: [],
      messages: [
        {
          id: 1,
          sender: "롱롱",
          text: "기본 메시지",
          isMine: false,
          type: "chat",
        }, // 이미지와 비슷한 가짜 데이터
        {
          id: 2,
          sender: "tabby",
          text: "저는 다 담았습니다!",
          isMine: false,
          type: "chat",
        },
      ],
    },
  };

  // roomId에 해당하는 데이터 찾기 (없으면 101번 방 기본 제공)
  const roomData = MOCK_DB[roomId] || MOCK_DB["101"];

  const [requests, setRequests] = useState(roomData.requests);
  const [messages, setMessages] = useState(roomData.messages);

  // ChatListPage에서 초대를 받아 넘어왔는지 감지
  useEffect(() => {
    if (location.state?.isInvited) {
      showToast("매칭 초대되었습니다.");

      // 중복 메시지 방지
      setMessages((prev) => {
        // 이미 초대 메시지가 배열 안에 있다면 기존 배열을 그대로 반환
        const isAlreadyInvited = prev.some(
          (msg) => msg.text === "매칭 초대되었습니다.",
        );
        if (isAlreadyInvited) return prev;

        // 없다면 새로운 시스템 메시지 추가
        const sysMsg = {
          id: Date.now(),
          type: "system",
          text: "매칭 초대되었습니다.",
        };
        return [...prev, sysMsg];
      });

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 유저 프로필 클릭 시 모달 열기
  const handleOpenModal = (req) => {
    openModal({
      content: (
        <>
          ‘{req.name}’ 유저의 매칭신청을
          <br />
          수락하시겠습니까?
        </>
      ),
      showImage: true,
      acceptText: "수락",
      rejectText: "거절",
      onAccept: () => {
        // 수락 시 시스템 메시지 추가 및 토스트 알림
        const systemMessage = {
          id: Date.now(),
          type: "system",
          text: `${req.name} 님이 입장하셨습니다.`,
        };
        setMessages((prev) => [...prev, systemMessage]);
        showToast("매칭 완료되었습니다.");

        // 목록에서 제거
        setRequests((prev) => prev.filter((r) => r.id !== req.id));
      },
      onReject: () => {
        // 거절 시 목록에서만 제거
        setRequests((prev) => prev.filter((r) => r.id !== req.id));
      },
    });
  };

  // 메시지 전송 함수
  const handleSendMessage = () => {
    // 빈칸만 입력했을 때는 무시
    if (inputValue.trim() === "") return;

    // 새로운 메시지 객체 생성
    const newMessage = {
      id: Date.now(), // 고유한 ID 부여
      sender: "나",
      text: inputValue,
      isMine: true,
    };

    // 기존 메시지 배열 끝에 새 메시지 추가
    setMessages([...messages, newMessage]);
    // 입력창 비우기
    setInputValue("");
  };

  // 엔터키를 눌렀을 때도 전송되게 하는 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="font-sf flex h-screen flex-col bg-white">
      {/* 상단 헤더 */}
      <header className="relative z-10 flex items-center justify-between bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/icons/back.svg"
            alt="뒤로가기"
            onClick={() => navigate(-1)}
            className="h-5 w-5 cursor-pointer"
          />
          {/* 뒤로가기 옆 숫자 (채팅 수에 따라 추후 수정...) */}
          <span className="text-lg font-bold text-black">0</span>
        </div>

        {/* 방 제목 가운데 정렬 */}
        <h2 className="absolute left-1/2 -translate-x-1/2 text-[22px] font-bold text-black">
          {roomData.title}
        </h2>
        <div className="w-8"></div>
      </header>

      {/* 매칭 요청 수락/거절 (대기 중인 요청이 있을 때만 보임) */}
      {/* receiver일 때만 대기자 목록 렌더링 */}
      {roomData.role === "receiver" && requests.length > 0 && (
        <section className="bg-blue-bg relative z-20 px-6 pt-5 pb-3">
          <div className="bg-blue-main absolute -top-3.5 right-6 rounded px-3 py-1.5 text-[11px] font-bold text-white shadow-sm">
            새로운 매칭신청
            <span className="bg-red absolute -top-2 -right-2 rounded-md px-1.5 py-0.5 text-[10px] text-white">
              {requests.length}
            </span>
          </div>

          <div className="flex gap-6 overflow-x-auto">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex min-w-12.5 cursor-pointer flex-col items-center"
                onClick={() => handleOpenModal(req)}
              >
                <div className="mb-1.5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src="/images/CharacterProfile.png"
                    alt="프로필"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="mb-0.5 text-[11px] font-bold text-black">
                  수락하기
                </span>
                <span className="text-gray-4 text-[10px] font-medium">
                  {req.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 채팅 메시지 내역 영역 */}
      <main className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6">
        {messages.map((msg) => {
          if (msg.type === "system") {
            //  시스템 메시지 (누구님이 입장하셨습니다)
            return (
              <div key={msg.id} className="my-3 flex justify-center">
                <span className="border-gray-2 text-blue-bg rounded-2xl border px-5 py-1.5 text-[12px] font-bold">
                  {msg.text}
                </span>
              </div>
            );
          }

          // 일반 채팅 메시지일 경우
          return (
            <div
              key={msg.id}
              className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
            >
              {/* 남이 보낸 메시지 */}
              {!msg.isMine && (
                <div className="flex max-w-[75%] gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <img
                      src="/images/CharacterProfile.png"
                      alt="프로필"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-1.5 ml-1 text-[13px] font-bold text-black">
                      {msg.sender}
                    </span>
                    <div className="bg-gray-7 rounded-2xl rounded-tl-none px-4 py-2.5 text-[14px] font-medium text-black">
                      {msg.text}
                    </div>
                  </div>
                </div>
              )}

              {/* 내가 보낸 메시지 */}
              {msg.isMine && (
                <div className="max-w-[75%]">
                  <div className="bg-gray-1 rounded-2xl rounded-tr-none px-4 py-2.5 text-[14px] font-medium text-white shadow-sm">
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          );
        })}{" "}
      </main>

      {/* 하단 메시지 입력 영역 */}
      <footer className="border-gray-7 border-t bg-white px-5 py-3 pb-8">
        <div className="bg-blue-bg flex items-center rounded-xl px-4 py-3">
          <input
            type="text"
            placeholder="메시지를 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="text-blue-main placeholder-blue-main flex-1 border-none bg-transparent text-[14px] font-medium outline-none"
          />
          <button onClick={handleSendMessage} className="ml-2">
            <img
              src="/icons/Send.svg"
              alt="전송"
              className="h-6 w-6 opacity-90"
            />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ChatRoomPage;
