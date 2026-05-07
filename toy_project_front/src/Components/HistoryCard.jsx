import { useNavigate } from "react-router-dom";

const HistoryCard = ({ post }) => {
  const navigate = useNavigate();
  const statusIcon =
    post.status === "매칭 중"
      ? "/icons/Matching.svg"
      : "/icons/MatchComplete.svg";
  return (
    <article
      onClick={() => navigate(`/mypage/history/post${post.id}`)}
      className="border-gray-2 flex cursor-pointer justify-between border-b py-6 transition-colors hover:bg-gray-50"
    >
      {/* 텍스트 정보 영역 */}
      <div className="flex flex-1 flex-col pr-4">
        {/* 프로필 이미지와 이름 */}
        <div className="flex items-center gap-3">
          <img
            src="/images/CharacterProfile.png"
            alt="프로필 이미지"
            className="h-15 w-15 object-contain"
          />
          <span className="text-lg font-medium text-black">{post.author}</span>
        </div>

        {/* 제목과 본문 */}
        <h4 className="mt-4 text-xl font-semibold text-black">{post.title}</h4>
        {/* truncate 클래스를 사용해 텍스트가 길면 자동으로 '...' 처리되게!! */}
        <p className="text-gray-4 mt-1 truncate text-xs">{post.content}</p>

        {/* 키워드 배열 반복 */}
        <div className="text-blue-main mt-3 flex gap-3 text-sm font-medium">
          {post.keywords.map((keyword, index) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>

        {/* 매칭 상태 정보 */}
        <div className="text-gray-4 mt-3 flex items-center gap-4 text-xs font-medium">
          {/* 텍스트 대신 statusIcon 사용 */}
          <img
            src={statusIcon}
            alt={post.status}
            className="h-3 object-contain"
          />
          <span>{post.matchRate}</span>
          <span>{post.price}</span>
        </div>
      </div>

      {/* 식당 사진 영역 */}
      <div className="bg-gray-2 h-40 w-30 shrink-0 overflow-hidden rounded-lg">
        <img
          src="/images/FoodPhoto.png"
          alt="식당 사진"
          className="h-full w-full object-cover"
        />
      </div>
    </article>
  );
};

export default HistoryCard;
