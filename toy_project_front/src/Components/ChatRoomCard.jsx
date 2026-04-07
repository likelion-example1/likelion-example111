const ChatRoomCard = ({ room, onClick }) => {
  return (
    // 카드를 클릭하면 상세 채팅방으로 이동하도록 onClick 이벤트 연결
    <article onClick={onClick} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid #E0E0E0', cursor: 'pointer' }}>
      
      {/* 왼쪽: 식당 사진 */}
      <div style={{ width: '80px', height: '80px', backgroundColor: '#D9D9D9', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ color: '#888' }}>📷</span>
      </div>

      {/* 오른쪽: 상세 정보 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        
        {/* 상단: 식당 이름과 채팅 미리보기 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>{room.title}</h3>
          <span style={{ fontSize: '12px', color: '#888' }}>{room.lastMessage}</span>
        </div>

        {/* 중간: 키워드들 */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '12px', backgroundColor: '#eee', padding: '2px 8px', borderRadius: '12px' }}>{room.category}</span>
          <span style={{ fontSize: '12px', backgroundColor: '#eee', padding: '2px 8px', borderRadius: '12px' }}>{room.location}</span>
        </div>

        {/* 하단: 참여 유저 프로필 아이콘과 금액 현황 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
          
          {/* 겹쳐 있는 유저 프로필들 */}
          <div style={{ display: 'flex' }}>
            {room.participants.map((user, index) => (
              <div key={index} style={{ 
                width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#bbb', 
                border: '1px solid #fff', marginLeft: index > 0 ? '-8px' : '0' // 동그라미들을 살짝 겹치게 만듦
              }}></div>
            ))}
            {/* 안 읽은 메시지가 있다면 빨간색 알림 표시 */}
            {room.unreadCount > 0 && (
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ffaaaa', color: '#fff', fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-4px', zIndex: 1 }}>
                {room.unreadCount}
              </div>
            )}
          </div>

          {/* 금액 현황 */}
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{room.currentAmount} / {room.targetAmount}</span>
        </div>

      </div>
    </article>
  );
};

export default ChatRoomCard;