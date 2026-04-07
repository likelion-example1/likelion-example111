import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatRoomCard from '../../Components/ChatRoomCard';
import GNB from '../../Components/GNB';

function ChatListPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('received'); // 탭 상태
  
  // 지난 매칭 숨기기 여부 (기본값 false = 보여줌)
  const [isPastHidden, setIsPastHidden] = useState(false);

  // 가상의 진행 중인 매칭 데이터
  const activeChats = [
    { id: 101, title: '식당 이름', category: '카테고리 키워드', location: '장소 키워드', lastMessage: '채팅 내용 미리보기', participants: ['A', 'B', 'C', 'D'], unreadCount: 3, currentAmount: '8,700', targetAmount: '14,000' }
  ];

  // 가상의 지난 매칭 데이터
  const pastChats = [
    { id: 201, title: '식당 이름 (지난)', category: '카테고리 키워드', location: '장소 키워드', lastMessage: '채팅 내용 미리보기', participants: ['A', 'B', 'C'], unreadCount: 0, currentAmount: '16,800', targetAmount: '16,000' },
    { id: 202, title: '식당 이름 (지난)', category: '카테고리 키워드', location: '장소 키워드', lastMessage: '채팅 내용 미리보기', participants: ['A', 'B'], unreadCount: 0, currentAmount: '24,340', targetAmount: '18,000' }
  ];

  // 채팅방 클릭 시 해당 방으로 이동하는 함수
  const goToChatRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/icons/back.png"
          alt="뒤로가기" 
          onClick={() => navigate(`/`)} 
          style={{ width: '20px', height: '20px', cursor: 'pointer', marginRight: '12px' }}
        />
        <h2>채팅창</h2>
      </header>

      {/* 필터링 바 (내가 받은 / 내가 보낸) */}
      <div>
        <button onClick={() => setActiveTab('received')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'received' ? '#A0A0A0' : 'transparent', color: activeTab === 'received' ? '#fff' : '#666', fontWeight: 'bold' }}>
          내가 받은
        </button>
        <button onClick={() => setActiveTab('sent')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'sent' ? '#A0A0A0' : 'transparent', color: activeTab === 'sent' ? '#fff' : '#666', fontWeight: 'bold' }}>
          내가 보낸
        </button>
      </div>

      <main>
        
        {/* 진행 중인 채팅방 목록 */}
        <section>
          {activeChats.map(room => (
            <ChatRoomCard key={room.id} room={room} onClick={() => goToChatRoom(room.id)} />
          ))}
        </section>

        {/* 지난 매칭 타이틀 및 숨기기 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '10px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: '#666' }}>지난 매칭</h4>
          
          {/* 클릭할 때마다 isPastHidden 상태가 반대(true<->false)로 바뀜! */}
          <button 
            onClick={() => setIsPastHidden(!isPastHidden)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            숨기기 <span>{isPastHidden ? 'v' : '^'}</span>
          </button>
        </div>

        {/* 지난 매칭 목록 (isPastHidden이 false일 때만 화면에 나타남) */}
        {!isPastHidden && (
          <section>
            {pastChats.map(room => (
              <ChatRoomCard key={room.id} room={room} onClick={() => goToChatRoom(room.id)} />
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