import { Link } from 'react-router-dom'; // 이게 있어야 Link 컴포넌트를 사용 가능
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
  
function SignupPage() {

  // 4개의 입력창을 위한 상태 입력
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();


  // 닉네임 중복확인 버튼 클릭 시 실행될 함수
  const handleCheckDuplicate = () => {
    if (userName === '') {
      alert('닉네임을 먼저 입력해주세요.');
      return;
    }
    // 실제 중복 여부 확인하는 로직은 나중에
    alert('사용 가능한 닉네임입니다!');
  };

  // 회원가입 버튼 클릭 시 실행될 함수
  const handleSignup = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (pw !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return; 
      // 일치하지 않으면 아래 코드가 실행되지 않고 함수 종료
    }

    if (!id || !pw || !userName) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // 모든 조건이 맞으면 가입 성공 알림 후 로그인 페이지로 이동
    alert('회원가입이 완료되었습니다! 로그인해주세요.');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <h2 style={{ color: '#316cc4' }}>Welcome to 한바구니</h2>
      </header>

      <main>
        {/* ID 입력창 */}
        <Input 
          type="text" 
          placeholder="ID" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
        />
        
        {/* 비밀번호 입력창 */}
        <Input 
          type="password" 
          placeholder="PW" 
          value={pw} 
          onChange={(e) => setPw(e.target.value)} 
        />

        {/* 비밀번호 확인 입력창 */}
        <Input 
          type="password" 
          placeholder="PW 확인" 
          value={passwordConfirm} 
          onChange={(e) => setPasswordConfirm(e.target.value)} 
        />

        {/* 닉네임 입력창과 중복확인 버튼을 나란히 묶어주기! */}
        <div style={{ display: 'flex' }}>
          <Input 
            type="text" 
            placeholder="User Name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
          {/* 중복확인하기 텍스트 버튼: 입력창 바로 아래 우측 정렬 */}
          <button 
            onClick={handleCheckDuplicate}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#888', 
              textDecoration: 'underline', 
              cursor: 'pointer',
              fontSize: '12px',
              marginTop: '8px'
            }}
          >
            중복확인하기
          </button>
        </div>

        {/* 회원가입 버튼 */}
        <div>
          <Button onClick={handleSignup}>회원가입</Button>
        </div>

      </main>

    </div>
  );
}

export default SignupPage;
