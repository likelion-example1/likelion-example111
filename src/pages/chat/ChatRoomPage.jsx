import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../api.js";
import useToastStore from "../../store/useToastStore.js";
import useModalStore from "../../store/useModalStore";

import useAuthStore from "../../store/useAuthStore.js";

function ChatRoomPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 :roomId 부분을 가져오는 useParams 훅
  const { roomId } = useParams();

  // 로그인한 내 정보 가져오기
  const { user } = useAuthStore();
  const myNickname = user?.username || "";

  const showToast = useToastStore((state) => state.showToast);
  const openModal = useModalStore((state) => state.openModal);

  // 채팅 입력창 상태
  const [inputValue, setInputValue] = useState("");

// 실시간 데이터 관리를 위한 상태들
  const [roomInfo, setRoomInfo] = useState({ 
    title: location.state?.title || "배달 매칭방", 
    role: location.state?.role || "received" 
  });
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);

  // 메시지 및 채팅방 세부 데이터 불러오기 (GET)
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Promise.all을 사용해 두 API를 동시 호출
      const [messagesResponse, requestsResponse, profileResponse] = await Promise.all([
        api.get(`/chats/${roomId}/messages/`),
        api.get(`/chats/${roomId}/requests/`),
        api.get("/accounts/profile/")
      ]);

      console.log("백엔드가 준 메시지 정보:", messagesResponse.data);
      console.log("백엔드가 준 대기자 목록 정보:", requestsResponse.data);
      console.log("내 프로필 정보 확인:", profileResponse.data);

      const myNickname = profileResponse.data.username || profileResponse.data.name || "";
      const myId = profileResponse.data.id || profileResponse.data.pk;

      // 백엔드가 빈 배열이나 메시지 리스트만 보낸 경우
      if (Array.isArray(messagesResponse.data)) {
        setMessages(messagesResponse.data.map(msg => ({
          id: msg.id,
          sender: msg.sender_nickname || msg.sender || "익명",
          text: msg.text || msg.content,
          isMine: msg.is_mine !== undefined ? msg.is_mine : msg.isMine,
          type: msg.type || "chat"
        })));
        } 
        // 백엔드가 객체 형태로 자세한 정보를 보낸 경우
        else if (typeof messagesResponse.data === "object" && messagesResponse.data !== null) {
        if (messagesResponse.data.messages) {
          setMessages(messagesResponse.data.messages.map(msg => ({
            id: msg.id,
            sender: msg.sender_nickname || msg.sender || "익명",
            text: msg.text || msg.content,
            isMine: msg.is_mine !== undefined ? msg.is_mine : msg.isMine,
            type: msg.type || "chat"
          })));
        }
      }
        // 과거 메시지 내역
        let rawMessages = [];
        if (Array.isArray(messagesResponse.data)) {
          rawMessages = messagesResponse.data;
        } else if (messagesResponse.data?.messages) {
          rawMessages = messagesResponse.data.messages;
        }

        const formattedMessages = rawMessages.map((msg) => {
          const text = msg.text || msg.content || "";
          
          // 내가 보낸 메시지인지, 시스템 메시지인지 판단
          const isSystemMessage = 
            msg.type === "system" || 
            msg.is_system === true || 
            (!msg.sender_id && !msg.sender_nickname && text.includes("입장하셨습니다"));

          // 시스템 메시지면 이름이 필요 없고, 일반 메시지면 이름이나 '익명'을 붙임
          const senderName = isSystemMessage ? "" : (msg.sender_nickname || msg.sender || "익명");
          
          // 내 글인지 확인 (시스템 메시지가 아닐 때만 검사)
          const isMyMessage = !isSystemMessage && (
            (msg.is_mine === true) || 
            (senderName === myNickname && myNickname !== "") || 
            (msg.sender_id && myId && String(msg.sender_id) === String(myId)) ||
            (msg.sender && myId && String(msg.sender) === String(myId))
          );

          return {
            id: msg.id,
            sender: senderName,
            text: text,
            isMine: isMyMessage, 
            type: isSystemMessage ? "system" : "chat" 
          };
        });
        
        setMessages(formattedMessages);
          
      // 대기 중인 신청 목록 세팅
      let rawRequests = [];
      if (Array.isArray(requestsResponse.data)) {
        rawRequests = requestsResponse.data;
      } else if (requestsResponse.data?.requests) {
        rawRequests = requestsResponse.data.requests;
      }

      const formattedRequests = rawRequests.map((req) => ({
        // 백엔드의 request_id를 프론트의 id로 변환
        id: req.request_id || req.id,
        // 유저 아이디는 그냥 보관
        guestid: req.guest_id, 
        // 백엔드의 guest_nickname을 프론트의 name으로 변환
        name: req.guest_nickname || req.name, 
        status: req.status 
      }));

      setRequests(formattedRequests);
      } catch (error) {
        console.error("채팅 내역 및 대기자 목록 조회 실패:", error);
      }
    };

    if (roomId) {
      fetchRoomData();
    }
  }, [roomId, location.state]);


  // ChatListPage에서 초대를 받아 넘어왔는지 감지
  useEffect(() => {
    if (location.state?.isParticipant) {
      showToast("매칭 초대되었습니다.");

      // 중복 메시지 방지
      setMessages((prev) => {
        // 이미 초대 메시지가 배열 안에 있다면 기존 배열을 그대로 반환
        const isAlreadyInvited = prev.some(
          (msg) => msg.text === "매칭 초대되었습니다.",
        );
        if (isAlreadyInvited) return prev;

        // 없다면 새로운 시스템 메시지 추가

        return [
          ...prev, 
          { id: Date.now(), type: "system", text: "매칭 초대되었습니다." }
        ];
      });

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 유저 프로필 클릭 시 모달 열기 (POST /chats/<post_id>/respond/)
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
      onAccept: async() => {
        try {
          // 백엔드에 수락 요청 전송 (POST)
          await api.post(`/chats/${roomId}/respond/`, { 
            action: "accept",
            request_id: req.id 
          });

          // API 성공 시: 수락 시스템 메시지 및 토스트 알림
          const systemMessage = {
            id: Date.now(),
            type: "system",
            text: `${req.name} 님이 입장하셨습니다.`,
          };
          setMessages((prev) => [...prev, systemMessage]);
          showToast("매칭 완료되었습니다.");

          // API 성공 시: 목록에서 방금 수락한 요청 지우기
          setRequests((prev) => prev.filter((r) => r.id !== req.id));
          
        } catch (error) {
          console.error("매칭 수락 실패:", error);
          showToast("요청 처리에 실패했습니다.");
        }
      },
      onReject: async () => {
        try {
          // 백엔드에 거절 요청 전송 (POST)
          await api.post(`/chats/${roomId}/respond/`, { 
            action: "reject",
            request_id: req.id 
          });

          // API 성공 시: 거절 시 목록에서만 지우기
          setRequests((prev) => prev.filter((r) => r.id !== req.id));
          
        } catch (error) {
          console.error("매칭 거절 실패:", error);
          showToast("요청 처리에 실패했습니다.");
        }
      },
    });
  };

  // 메시지 전송 함수 (POST /chats/<post_id>/messages/)
  const handleSendMessage = async () => {
    // 빈칸만 입력했을 때는 무시
    if (inputValue.trim() === "") return;

    // 새로운 메시지 객체 생성
    try {
      const response = await api.post(`/chats/${roomId}/messages/`, {
        content: inputValue, // 추후수정!! _260621 수정완
      });
      // 성공 시 보낸 메시지를 화면에 반영
      setMessages((prev) => [
        ...prev,
        {
          id: response.data.id || Date.now(),
          sender: "나",
          text: inputValue,
          isMine: true,
          type: "chat"
        },
      ]);
    // 입력창 비우기
    setInputValue("");
    } catch (error) {
      console.error("메시지 발송 실패:", error);
      showToast("메시지 전송에 실패했습니다.");
    }
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
          {roomInfo.title}
        </h2>
        <div className="w-8"></div>
      </header>

      {/* 매칭 요청 수락/거절 (대기 중인 요청이 있을 때만 보임) */}
      {/* receiver일 때만 대기자 목록 렌더링 */}
      {roomInfo.role === "received" && requests.length > 0 && (
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
