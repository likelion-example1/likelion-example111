import { Link } from 'react-router-dom';
import mypageIcon from '../../public/icons/mypage.png';

function GNB() {
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#fff', borderTop: '1px solid #ccc' }}>
      <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: '10px 0', margin: 0 }}>
        <li>
          {/* 클릭 시 /chat (채팅 목록) 경로로 이동 */}
          <Link to="/chat">채팅</Link>
        </li>
        <li>
          {/* 클릭 시 /home (홈 화면) 경로로 이동 */}
          <Link to="/">홈</Link>
        </li>
        <li>
          {/* 클릭 시 /mypage (마이페이지 메인) 경로로 이동 */}
          {/* 디자인에는 사람 모양 아이콘이 있으니 나중에 아이콘으로 교체 */}
          <Link to="/mypage">
            <img 
              src={mypageIcon} 
              alt="마이페이지" 
              style={{ width: '20px', height: '20px' }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default GNB;