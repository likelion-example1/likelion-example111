import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryCard from '../../Components/HistoryCard'; // 리스트에 들어갈 항목들을 카드 컴포넌트로 제작

export function MyPageHistory() {
  const navigate = useNavigate();

  // 현재 선택된 탭 저장 (기본값: '내가 받은')
  const [activeTab, setActiveTab] = useState('received');

  // 가상의 매칭 내역 데이터 배열
  const historyData = [
    {
      id: 1,
      type: 'received', // '내가 받은' 탭에 보여질 항목
      author: '김이화',
      title: '제목',
      content: '본문 내용',
      keywords: ['#키워드1', '#키워드2', '#키워드3'],
      status: '매칭 중',
      matchRate: '80%',
      price: '14,000'
    },
    {
      id: 2,
      type: 'sent', // '내가 보낸' 탭에 보여질 항목
      author: '김이화',
      title: '제목',
      content: '본문 내용',
      keywords: ['#키워드1', '#키워드2', '#키워드3'],
      status: '매칭 완료',
      matchRate: '80%',
      price: '9,000'
    },
    {
      id: 3,
      type: 'received',
      author: '김이화',
      title: '제목',
      content: '본문 내용',
      keywords: ['#키워드1', '#키워드2', '#키워드3'],
      status: '매칭 완료',
      matchRate: '80%',
      price: '23,000'
    }
  ];

  // 전체 데이터 중 현재 선택된 탭(activeTab)과 타입이 일치하는 데이터만 걸러내는 함수!
  const filteredData = historyData.filter(post => post.type === activeTab);

  return (
    <div>
      <header style={{ display: 'flex'}}>
        <img 
          src="/icons/back.png" 
          alt="뒤로가기" 
          onClick={() => navigate('/mypage')}
          style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '12px', marginRight: '12px' }}
        />
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '6px' }}>
          나의 매칭내역</p>
      </header>

      <main>
        <div>
          <button onClick={() => setActiveTab('received')}
            style = {{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              // 선택된 탭은 진한 회색, 선택되지 않은 탭은 배경색과 같은 색으로!
              backgroundColor: activeTab === 'received' ? '#A0A0A0' : 'transparent',
              color: activeTab === 'received' ? '#fff' : '#666'
            }}
            >
            내가 받은
          </button>
          <button onClick={() => setActiveTab('sent')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: activeTab === 'sent' ? '#A0A0A0' : 'transparent',
              color: activeTab === 'sent' ? '#fff' : '#666'
            }}
          >
            내가 보낸
          </button>
        </div>

        <section>
          {/* 필터링된 매칭 내역 리스트 */}
          {filteredData.length > 0 ? (
            filteredData.map((post) => (
              <HistoryCard key={post.id} post={post} />
            ))
          ) : (
            // 데이터가 없을 때 보여줄 화면 처리
            <div style={{ padding: '40px 0', color: '#999' }}>
              매칭 내역이 없습니다.
            </div>
          )}
        </section>
      </main>

    </div>
  );
}

export default MyPageHistory;
