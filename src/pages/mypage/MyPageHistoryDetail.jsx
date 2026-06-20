import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api.js";
import GNB from "../../Components/GNB";
import useToastStore from "../../store/useToastStore";

export function MyPageHistoryDetail() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  // URL에서 :postId 부분을 가져오는 useParams 훅
  const { postId } = useParams();

  // 상단 탭 상태
  const [activeTab, setActiveTab] = useState("received");

  // 데이터 상태 관리
  const [postDetail, setPostDetail] = useState(null);
  const [myId, setMyId] = useState(null); // 'me' 뱃지를 달기 위해 내 ID 저장
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        // 내 프로필 정보 가져오기
        const profileResponse = await api.get("/accounts/profile/");
        setMyId(profileResponse.data.id || profileResponse.data.pk);
        const numericPostId = postId.replace(/[^0-9]/g, "");

        // postId에 해당하는 특정 게시글 상세 정보 가져오기
        const postResponse = await api.get(`/posts/${numericPostId}/`);
        setPostDetail(postResponse.data);
      } catch (error) {
        console.error("상세 정보 조회 실패:", error);
        showToast("게시글 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchDetailData();
    }
  }, [postId]);

  // 로딩 중일 때 보여줄 화면
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <span className="text-gray-4 font-bold">로딩 중...</span>
      </div>
    );
  }

  // 게시글 정보가 없을 때 보여줄 화면
  if (!postDetail) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <span className="text-gray-4 mb-4 font-bold">게시글을 찾을 수 없습니다.</span>
        <button onClick={() => navigate(-1)} className="text-blue-main font-bold">
          뒤로 가기
        </button>
      </div>
    );
  }

  // 날짜, 금액, 아이콘 등
  const statusIcon =
    postDetail.status === "매칭 중" || postDetail.status === "모집중"
      ? "/icons/Matching.svg"
      : "/icons/MatchComplete.svg";

  // 날짜 (YYYY.MM.DD HH:MM)
  const formattedDate = postDetail.date
    ? new Date(postDetail.date).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "날짜 정보 없음";

  // 금액 
  const formattedPrice =
    postDetail.min_order_amount ?? "설정되지 않음";

  return (
    <div className="font-sf relative min-h-screen bg-white pt-10 pb-28">
      {/* 상단 헤더 영역 */}

      <header className="mb-4 flex items-center gap-2 px-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-1">
          <img src="/icons/back.svg" alt="뒤로가기" className="h-5 w-5" />
        </button>

        <h1 className="text-xl font-bold text-black">나의 매칭내역</h1>
      </header>

      {/* 탭 영역 */}

      <div className="bg-blue-bg flex gap-3 px-6 py-4">
        <button
          onClick={() => setActiveTab("received")}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${
            activeTab === "received"
              ? "bg-blue-main text-white"
              : "bg-white text-black"
          }`}
        >
          내가 받은
        </button>

        <button
          onClick={() => setActiveTab("sent")}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${
            activeTab === "sent"
              ? "bg-blue-main text-white"
              : "bg-white text-black"
          }`}
        >
          내가 보낸
        </button>
      </div>

      {/* 메인 상세 내용 영역 */}

      <main className="px-6 py-6">
        {/* 제목 */}

        <h1 className="mb-4 text-4xl font-bold text-black">
          {postDetail.title}
        </h1>

        {/* 작성자 및 매칭 정보 */}

        <div className="mb-6 flex items-center justify-between">
          {/* 좌측: 프로필 및 날짜 */}

          <div className="flex items-center gap-3">
            <div>
              <img
                src="/images/CharacterProfile.png"
                alt="프로필"
                className="h-15 w-15 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold text-black">
                {postDetail.host_nickname}
              </span>

              <span className="text-gray-4 mt-0.5 text-[11px] font-medium">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* 키워드 및 상태 */}

          <div className="flex flex-col items-end gap-1.5">
            <div className="text-blue-main flex gap-2 text-xs font-bold">
              {postDetail.keywords?.map((kw, i) => (
                <span key={i}>{kw}</span>
              ))}
            </div>

            <div className="text-gray-4 flex items-center gap-2 text-[11px] font-bold">
              <img src={statusIcon} alt="상태" className="h-3 object-contain" />

              <span>{postDetail.matchRate}</span>

              <span>{formattedPrice}</span>
            </div>
          </div>
        </div>

        {/* 식당/음식 사진 */}

        <div className="mb-6 flex aspect-4/3 items-center justify-center overflow-hidden rounded-sm bg-gray-2">
          {postDetail.photo ? (
            <img
              src={postDetail.photo}
              alt="음식 사진"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src="/images/FoodPhoto.png"
              alt="음식 사진"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* 본문 내용 */}

        <p className="text-[15px] leading-relaxed font-bold whitespace-pre-line text-black">
          {postDetail.content}
        </p>

        {/* 구분선 */}

        <hr className="border-gray-2 my-8" />

        {/* 매칭 참여 유저 섹션 */}

        <div>
          <h3 className="text-blue-main mb-1 font-bold">매칭에 참여한 유저</h3>

          {postDetail.targetAmount && (
            <p className="text-blue-main mb-6 text-right text-[13px] font-bold">
              {postDetail.currentAmount ?? 0} / {postDetail.min_order_amount ?? 0}
            </p>
          )}
          <div className="mb-6"></div>

          <div className="flex flex-col gap-5">
            {postDetail.participants?.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                {/* 프로필 + 이름 */}

                <div className="flex w-1/3 items-center gap-3">
                  <div>
                    <img
                      src="/images/CharacterProfile.png"
                      alt="프로필"
                      className="h-15 w-15 object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-base font-medium text-black">
                      {user.name}
                    </span>

                    {/* me 뱃지 */}

                    {user.isMe && (
                      <span className="mt-1 text-[10px] font-bold text-black">
                        me
                      </span>
                    )}
                  </div>
                </div>

                {/* 메뉴 */}

                <span className="text-gray-4 truncate px-2 text-center text-[13px] font-medium">
                  {user.menu}
                </span>

                {/* 가격 */}

                <span className="text-gray-4 pr-30 text-right text-[13px] font-medium">
                  {user.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <GNB />
    </div>
  );
}

export default MyPageHistoryDetail;
