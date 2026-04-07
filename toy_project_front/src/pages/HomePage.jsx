import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import GNB from '../Components/GNB'; // GNB 컴포넌트 불러오기
import Card from '../Components/Card'; // 만들어둔 공통 컴포넌트
import Button from '../Components/Button';


function HomePage() {
  const navigate = useNavigate();

  // useState 훅: 서버에서 받아올 가상의 게시글 목록 상태
  // 나중에 게시글이 여러 개로 늘어날 때 map 함수를 사용할 것  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: '김이화',
      title: '제목',
      content: '본문 내용',
      keywords: ['#키워드1', '#키워드2', '#키워드3'],
      status: '매칭 중 ',
      matchRate: '80% ',
      currentMoney: 4000 ,
    }
  ]);

  // 글쓰기 버튼 클릭 이벤트 핸들러
  const handleWriteClick = () => {
    navigate('/write');
  };

  // 검색창 클릭 이벤트 핸들러
  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div>
      <header>
        <h2>Home</h2>
        {/* 검색창 컴포넌트 */}
        <input 
            type="text" 
            placeholder="검색어를 입력해주세요."
            onClick={handleSearchClick} 
        />
      </header>

      <main>
        <section>
          <h3>Lunch Time!</h3>
          <p>지금 구하고 있는 유저를 구경해보세요.</p>
        </section>

        <section>
        {/* 배열 데이터(posts)를 map 함수를 사용해 반복 */}
          {posts.map((post) => (
              <Card key={post.id}>
              <Button onClick={() => alert('매칭 신청이 완료되었습니다!')}>
                매칭 신청하기
              </Button>
            <div>
            <img 
              src="/images/profileimage.png"  
              alt="프로필 이미지" 
              style={{ width: '20px', height: '20px', marginTop: '4px', marginRight: '8px' }}
            />
              <span>{post.author}</span>
            </div>
            <h4>{post.title}</h4>
            <p>{post.content} </p>
            <div>
                {/* 키워드도 배열이므로 map으로!! */}
                {post.keywords.map((keyword, index) => (
                  <span key={index}>{keyword} </span>
                ))}
              </div>
            <div>
              <span>{post.status}</span>
              <span>{post.matchRate}</span>
              <span>{post.currentMoney.toLocaleString()}원</span>
            </div>
          </Card>
          ))}
        </section>

        {/* 글쓰기 버튼, 글 작성 창으로 이동 */}
        <Button onClick={handleWriteClick}>글 쓰기</Button>
      </main>

      {/* GNB 컴포넌트로 바텀 네비게이션 바 제작 */}
      <GNB />
    </div>
  );
}

export default HomePage;