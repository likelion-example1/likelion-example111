const HistoryCard = ({ post }) => {
  return (
    <article style={{ borderBottom: '1px solid #E0E0E0', padding: '16px 0' }}>
      {/* 1. 텍스트 정보 영역 */}
      <div>
        {/* 프로필 이미지와 이름 */}
        <div>
            <img 
              src="/images/profileimage.png"  
              alt="프로필 이미지" 
              style={{ width: '20px', height: '20px', marginTop: '4px', marginRight: '8px' }}
            />
          <span> {post.author}</span>
        </div>
        
        {/* 제목과 본문 */}
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        
        {/* 키워드 배열 반복 */}
        <div>
          {post.keywords.map((keyword, index) => (
            <span key={index}>{keyword} </span>
          ))}
        </div>
        
        {/* 매칭 상태 정보 */}
        <div>
          <span>• {post.status} </span>
          <span>{post.matchRate} </span>
          <span>{post.price} </span>
        </div>
      </div>

      {/* 2. 식당 사진 영역 */}
      <div>
        <span>(식당 사진)</span>
      </div>
    </article>
  );
};

export default HistoryCard;