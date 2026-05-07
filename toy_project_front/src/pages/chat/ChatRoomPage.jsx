import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../Components/Toast";

function ChatRoomPage() {
  const navigate = useNavigate();

  // URL에서 :roomId 부분을 가져오는 useParams 훅
  const { roomId } = useParams();

  // 채팅 입력창 상태
  const [inputValue, setInputValue] = useState("");

  // 매칭 요청 대기 중인 유저 목록 상태
  const [requests, setRequests] = useState([
    { id: 1, name: "diadia" },
    { id: 2, name: "깨비" },
    { id: 3, name: "꿀꿀" },
  ]);

  // 주고받은 채팅 메시지 목록 상태 (isMine이 true면 내가 보낸 것)
  const [messages, setMessages] = useState([
    { id: 1, sender: "율율", text: "저 메뉴 골랐어요!", isMine: false },
    { id: 2, sender: "왈왈", text: "저는 다 담았습니다!", isMine: false },
    { id: 3, sender: "나", text: "율율님", isMine: true },
    {
      id: 4,
      sender: "나",
      text: "혹시 젤라또 맛 몇 가지로 시키실 예정이세요?",
      isMine: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 유저 프로필 클릭 시 모달 열기
  const openModal = (req) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  // 모달에서 수락/거절 버튼 클릭 시 처리
  const processRequest = (action) => {
    if (action === "accept") {
      // 수락 시 시스템 메시지 추가
      const systemMessage = {
        id: Date.now(),
        type: "system", //
        text: `${selectedRequest.name} 님이 입장하셨습니다.`,
      };
      setMessages((prev) => [...prev, systemMessage]);

      // 토스트 알림 띄우기
      setToastMessage("매칭 완료되었습니다.");
      setShowToast(true);
    }

    // 수락이든 거절이든 해당 유저를 대기 목록에서 삭제 (빨간 숫자도 자동 감소!!)
    setRequests((prev) => prev.filter((req) => req.id !== selectedRequest.id));

    // 모달 닫기
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // 매칭 요청 수락/거절 함수
  const handleRequest = (userId, action) => {
    if (action === "accept") {
      alert("매칭 요청을 수락했습니다.");
    } else {
      alert("매칭 요청을 거절했습니다.");
    }
    setRequests(requests.filter((req) => req.id !== userId));
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
          Waffle it up
        </h2>
        <div className="w-8"></div>
      </header>

      {/* 매칭 요청 수락/거절 (대기 중인 요청이 있을 때만 보임) */}
      {requests.length > 0 && (
        <section className="bg-blue-bg relative z-20 px-6 pt-5 pb-3">
          <div className="bg-blue-main absolute -top-4 right-6 rounded px-3 py-1.5 text-[13px] font-bold text-white shadow-sm">
            새로운 매칭신청
            <span className="bg-red absolute -top-2 -right-2 rounded-md px-1.5 py-0.5 text-[10px] text-white">
              {requests.length}
            </span>
          </div>

          <div className="flex gap-6 overflow-x-auto">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex min-w-12.5 flex-col items-center"
                onClick={() => openModal(req)}
              >
                <div className="mb-1.5 flex h-13 w-13 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src="/images/CharacterProfile.png"
                    alt="프로필"
                    className="h-full w-full object-cover"
                  />
                </div>

                <span
                  className="mb-0.5 cursor-pointer text-[11px] font-bold text-black"
                  onClick={() => handleRequest(req.id, "accept")}
                >
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
          // 시스템 메시지일 경우 (누구님이 입장하셨습니다)
          if (msg.type === "system") {
            return (
              <div
                key={msg.id}
                className="text-gray-4 my-2 text-center text-[13px] font-bold"
              >
                {msg.text}
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
                  <div className="border-gray-2 h-12 w-12 shrink-0 overflow-hidden rounded-full border shadow-sm">
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

      {/* 매칭 수락/거절 모달창 */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-[1px]">
          <div className="flex w-70 transform flex-col items-center overflow-hidden rounded-2xl bg-white pt-8 shadow-xl transition-all">
            <div className="border-gray-2 mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white shadow-sm">
              <img
                src="/images/CharacterProfile.png"
                alt="프로필"
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mb-8 px-6 text-center text-[16px] leading-relaxed font-bold text-black">
              ‘{selectedRequest.name}’ 유저의 매칭신청을
              <br />
              수락하시겠습니까?
            </p>

            <div className="border-gray-2 flex w-full border-t bg-gray-50">
              <button
                onClick={() => processRequest("reject")}
                className="border-gray-2 text-gray-4 flex-1 border-r py-3.5 text-[15px] font-bold transition-colors hover:bg-gray-200"
              >
                거절
              </button>
              <button
                onClick={() => processRequest("accept")}
                className="text-blue-main flex-1 py-3.5 text-[15px] font-bold transition-colors hover:bg-blue-50"
              >
                수락
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 공통 토스트 알림창 */}
      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default ChatRoomPage;
