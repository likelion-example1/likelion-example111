import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card';

function MyPageAccount() {
  const navigate = useNavigate();

  // 파일 업로드 input을 조작하기 위한 hook
  const fileInputRef = useRef(null);

  // mock user data
  const user = {
    name: '김이화',
    id: 'kimewha'
  };

  // '사진 업로드' 글씨를 클릭했을 때 실행
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 사용자가 실제 이미지를 선택했을 때 실행
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`${file.name} 사진이 선택되었습니다.`);
    }
  };

  // 비밀번호 변경 클릭
  const handleChangePassword = () => {
    alert('비밀번호 변경 페이지로 이동합니다.');
    // 비밀번호 변경 페이지 필요, 화면설계서에 따로 없어서 이번에는 구현하지 않음. 추후 수정
  };

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
          계정 정보</p>
      </header>

      <main>
        {/* 유저 정보 카드 */}
        <Card>
          <div>
            <img 
              src="/images/profileimage.png"  
              alt="프로필 이미지" 
              style={{ width: '20px', height: '20px', marginTop: '4px', marginRight: '8px' }}
            />
            
            <div>
              <h3>{user.name}</h3>

              <button onClick={handleUploadClick}>사진 업로드</button>
              

              {/* 화면에는 보이지 않지만 진짜로 파일을 받는 input 태그 */}
              <input 
                type="file" 
                accept="image/*" // 이미지만 선택할 수 있게 제한
                ref={fileInputRef} // useRef와 연결!
                onChange={handleFileChange} 
                style={{ display: 'none' }} // 화면에서 숨김 처리
              />
            </div>
          </div>
          
          <hr />

          <div>
            <span>ID </span>
            <span>{user.id}</span>
          </div>
        </Card>

        {/* 비밀번호 변경 탭 영역 */}
        <div>
          <button onClick={handleChangePassword}>
            비밀번호 변경
          </button>
        </div>
      </main>


    </div>
  );
}

export default MyPageAccount;