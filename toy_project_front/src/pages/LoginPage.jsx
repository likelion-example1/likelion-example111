import { Link } from 'react-router-dom'; // 이게 있어야 Link 컴포넌트를 사용 가능
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

function LoginPage() {
  // 사용자가 입력할 ID와 비밀번호를 저장할 상태 입력
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직 구현
    alert(`${id}님 환영합니다!`);
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <header>
        <h1 style={{ color: '#316cc4' }}>Welcome to<br />한바구니</h1>
      </header>

      <main>
        <form>
          <Input 
            type="text" 
            placeholder="ID" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
          />
        
          <Input 
            type="password" 
            placeholder="PW" 
            value={pw} 
            onChange={(e) => setPw(e.target.value)} 
          />
          
        <div style={{ marginTop: '20px' }}>
         <Button onClick={handleLogin}>Log in</Button>
        </div>
        
        </form>
        
        <div>    
          <button 
            onClick={handleSignup} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#888', 
              textDecoration: 'underline', 
              cursor: 'pointer',
            }}
          >
            회원가입하기
          </button>
        </div>
      </main>

    </div>
  );
}

export default LoginPage;
