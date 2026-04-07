import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ChatRoomPage() {
  const navigate = useNavigate();
  
  // URL에서 :roomId 부분을 가져오는 useParams 훅
  const { roomId } = useParams();

  // 채팅 입력창 상태
  const [inputValue, setInputValue] = useState('');

  // 매칭 요청 대기 중인 유저 목록 상태
  const [requests, setRequests] = useState([
    { id: 1, name: 'user1' },
    { id: 2, name: 'user2' },
    { id: 3, name: 'user3' }
  ]);

  // 주고받은 채팅 메시지 목록 상태 (isMine이 true면 내가 보낸 것)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user name', text: '안녕하세요!', isMine: false },
    { id: 2, sender: 'user name', text: '오늘 같이 밥 먹어요.', isMine: false },
    { id: 3, sender: '나', text: '좋아요! 어디서 볼까요?', isMine: true }
  ]);


  // 매칭 요청 수락/거절 함수
  const handleRequest = (userId, action) => {
    if (action === 'accept') {
      alert('매칭 요청을 수락했습니다.');
    } else {
      alert('매칭 요청을 거절했습니다.');
    }
    setRequests(requests.filter(req => req.id !== userId));
  };

  // 메시지 전송 함수
  const handleSendMessage = () => {
    // 빈칸만 입력했을 때는 무시
    if (inputValue.trim() === '') return;

    // 새로운 메시지 객체 생성
    const newMessage = {
      id: Date.now(), // 고유한 ID 부여
      sender: '나',
      text: inputValue,
      isMine: true
    };

    // 기존 메시지 배열 끝에 새 메시지 추가
    setMessages([...messages, newMessage]);
    // 입력창 비우기
    setInputValue('');
  };

  // 엔터키를 눌렀을 때도 전송되게 하는 함수
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      
       <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src="/icons/back.png"
          alt="뒤로가기" 
          onClick={() => navigate(`/chat/ChatListPage`)} 
          style={{ width: '20px', height: '20px', cursor: 'pointer', marginRight: '12px' }}
        />
          {/* 뒤로가기 버튼 옆에 신규 채팅 수 뱃지 */}
          <span style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '4px' }}>3</span>
        <h2 style={{ fontSize: '18px', margin: 0, flex: 1, textAlign: 'center', marginRight: '40px' }}>식당 이름</h2>
      </header>

      {/* 매칭 요청 수락/거절 영역 (대기 중인 요청이 있을 때만 보임) */}
      {requests.length > 0 && (
        <section style={{ display: 'flex', gap: '16px', padding: '16px 20px', borderBottom: '1px solid #E0E0E0', overflowX: 'auto' }}>
          {requests.map((req) => (
            <div key={req.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D9D9D9', marginBottom: '8px' }}></div>
              <div style={{ display: 'flex', gap: '4px', fontSize: '12px', color: '#666' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => handleRequest(req.id, 'accept')}>수락</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => handleRequest(req.id, 'reject')}>거절</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 채팅 메시지 내역 영역 */}
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ 
            display: 'flex', 
            // 내가 보낸 메시지면 오른쪽 끝으로, 아니면 왼쪽 끝으로 정렬
            justifyContent: msg.isMine ? 'flex-end' : 'flex-start' 
          }}>
            
            {/* 남이 보낸 메시지일 때만 프로필과 이름을 보여줌 */}
            {!msg.isMine && (
              <div style={{ marginRight: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#D9D9D9' }}></div>
              </div>
            )}
            
            <div style={{ maxWidth: '70%' }}>
              {!msg.isMine && <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{msg.sender}</div>}
              
              {/* 말풍선 스타일 */}
              <div style={{ 
                padding: '10px 16px', 
                borderRadius: '16px', 
                // 내가 보낸 건 짙은 회색, 남이 보낸 건 옅은 회색
                backgroundColor: msg.isMine ? '#CCCCCC' : '#EAEAEA',
                color: '#333',
                fontSize: '14px',
                wordBreak: 'break-word' // 긴 글씨가 박스를 뚫고 나가지 않게 해줌!!
              }}>
                {msg.text}
              </div>
            </div>

          </div>
        ))}
      </main>

      {/* 하단 메시지 입력 영역 */}
      <footer style={{ padding: '16px 20px', borderTop: '1px solid #E0E0E0', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: '24px', padding: '8px 16px' }}>
          <input 
            type="text" 
            placeholder="내용을 입력하세요." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ border: 'none', background: 'transparent', flex: 1, outline: 'none', fontSize: '14px' }}
          />
          <button 
            onClick={handleSendMessage}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 0 0 8px' }}
          >
            ↗
          </button>
        </div>
      </footer>

    </div>
  );
}

export default ChatRoomPage;