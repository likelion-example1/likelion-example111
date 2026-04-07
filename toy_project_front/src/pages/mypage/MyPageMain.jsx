import { useNavigate } from 'react-router-dom';
import GNB from '../../Components/GNB';
import MatchCount from '../../Components/MatchCountBar'; 

function MyPageMain() {
  const navigate = useNavigate();

  // mock 데이터
  const user = {
    name: '김이화',
    id: 'kimewha',
    matchCount: 3 
  };

  return (
    <div>
      <header style={{ display: 'flex'}}>
        <img 
          src="/icons/back.png" 
          alt="뒤로가기" 
          onClick={() => navigate('/')}
          style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '12px', marginRight: '12px' }}
        />
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '6px' }}>마이페이지</p>
      </header>

      <main>
        <section>
          <div style={{ display: 'flex'}}>
            <h3 style={{ fontSize: '20px', margin: 0 }}>{user.name}</h3>
            <span style={{ fontSize: '16px', color: '#555', fontWeight: 'bold', marginLeft: '12px' }}>{user.id}</span>
          </div>
          <div>

        <img 
          src="/images/profileimage.png" 
          alt="프로필 이미지" 
          style ={{ width: '300px', height: '300px', marginTop: '12px' }}
        />
          </div>
        </section>

        <section style={{ borderBottom: '1px solid #bdbdbd' }}>
          {/* 가상 데이터인 matchCount(3)을 하위 컴포넌트로 전달 */}
          <MatchCount currentCount={user.matchCount} 
          />
        </section>

        <section>
          <div 
          onClick={() => navigate('/mypage/account')}
          style={{ borderBottom: '1px solid #E0E0E0', cursor: 'pointer' }}
          >
            <p>☞ 계정 정보</p>
          </div>
          <div 
          onClick={() => navigate('/mypage/history')}
          style={{ borderBottom: '1px solid #E0E0E0', cursor: 'pointer' }}
          >
            <p>☞ 나의 매칭 내역</p>
          </div>
        </section>
      </main>


      {/* GNB 컴포넌트로 바텀 네비게이션 바 제작 */}
      <GNB />
    </div>
  );
}

export default MyPageMain;
