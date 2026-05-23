import { useState } from "react";
import useModalStore from "../store/useModalStore";
import { useNavigate } from "react-router-dom";
import useToastStore from "../store/useToastStore";
import api from "../api.js";

const TimelineCard = ({ post, isMyPost }) => {
  const navigate = useNavigate();

  // 매칭 신청 완료 여부
  const [isApplied, setIsApplied] = useState(false);

  // Zustand 액션 가져오기
  const openModal = useModalStore((state) => state.openModal);
  const showToast = useToastStore((state) => state.showToast);

  // 매칭 신청하기 버튼 클릭 시
  const handleApplyClick = (e) => {
    // ★★★★★★★ 260519_이 부분은 게시글 상세 페이지 구현안할거면 없어도 됨...
    // 260523_기디님께서 만들어주신다고 하심! 상세 페이지 생기면 추후 수정
    e.stopPropagation(); // 매칭 신청하기 눌렀을 때 게시글 상세 페이지로 가는 것 막기
    if (isMyPost || isApplied) return;

    // 전역 모달 띄우기
    openModal({
      content: (
        <>
          '{post.title}'에
          <br />
          매칭신청을 보내시겠습니까?
        </>
      ),
      showImage: false,
      acceptText: "예",
      rejectText: "아니오",
      onAccept: async () => {
        // '예'를 눌렀을 때 상태를 '신청 완료'로 변경
        // 백엔드로 POST 요청
        try {
          await api.post(`/posts/${post.id}/join/`);

          // API 성공 시 화면 상태를 '신청 완료'로 변경하고 알림 띄우기
          setIsApplied(true);
          showToast("매칭 신청이 완료되었습니다.");
        } catch (error) {
          console.error("매칭 신청 실패:", error);
          // 백엔드에서 보내준 에러 메시지가 있다면 띄우고, 없으면 기본 메시지
          const errorMsg =
            error.response?.data?.message ||
            error.response?.data?.detail ||
            "매칭 신청에 실패했습니다.";
          showToast(errorMsg);
        }
      },
    });
  };

  // ★★★★★★ 추후 수정!!! 아직 게시글 상세 페이지 없음
  // 카드 전체 클릭 시 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <>
      {/* 매칭 신청하기 버튼 위치 때문에 relative, mt-4를 준다 */}
      <article
        onClick={handleCardClick} // 없앨 수도
        className="bg-gray-7 relative mt-4 flex gap-4 rounded-2xl p-4 shadow"
      >
        {/* 우측 상단 '매칭 신청하기' 버튼 */}
        <div
          onClick={handleApplyClick}
          className={`absolute -top-3 -right-2 cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold shadow-sm transition-opacity hover:opacity-80 ${
            // 내가 쓴 글이면 버튼을 클릭할 수 없게 스타일 적용
            isMyPost || isApplied
              ? "bg-gray-2 text-gray-1 cursor-not-allowed"
              : "bg-blue-bg text-blue-main"
          }`}
        >
          {/* 조건에 따라 글자를 다르게 보여줌 */}
          {isMyPost ? "내가 쓴 글" : isApplied ? "신청 완료" : "매칭 신청하기"}
        </div>

        {/* 좌측 식당 사진 */}
        <div className="bg-gray-2 flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg">
          <img
            src={post.photo ? post.photo : "/images/FoodPhoto.png"}
            alt="식당 사진"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 우측 상세 정보 영역 */}
        <div className="flex flex-1 flex-col justify-between pt-1">
          {/* 식당 이름 */}
          <h3 className="text-right text-lg font-bold">{post.title}</h3>

          {/* 메시지 + 겹친 프로필 이미지 */}
          <div className="mt-1 flex items-center justify-end gap-3">
            {/* isApplied 상태에 따라 메시지를 다르게 보여준다 */}
            {isApplied ? (
              <div className="border-gray-2 text-blue-bg rounded-xl border bg-white px-3 py-1 text-xs font-bold shadow-sm">
                매칭신청을 보냈습니다.
              </div>
            ) : (
              <span className="text-gray-4 text-xs font-medium">
                {post.lastMessage || "아직 대화가 없습니다."}
              </span>
            )}
            <div className="flex">
              {post.participants && post.participants.length > 0 ? (
                post.participants
                  .slice(0, 3)
                  .map((_, index) => (
                    <img
                      key={index}
                      src="/images/UserProfileExample.png"
                      alt={`참여자`}
                      className={`bg-gray-2 h-6 w-6 rounded-full border border-white object-cover ${
                        index > 0 ? "-ml-2" : ""
                      }`}
                    />
                  ))
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-gray-100">
                  <span className="text-[8px] text-gray-400">0</span>
                </div>
              )}
            </div>
          </div>

          {/* 키워드 + 금액 */}
          <div className="mt-3 flex items-end justify-between">
            <div className="flex gap-1.5">
              {post.location && (
                <span className="bg-gray-3 rounded-full px-2.5 py-1 text-[10px] font-medium text-white">
                  {post.location}
                </span>
              )}
              {post.category && (
                <span className="bg-gray-3 rounded-full px-2.5 py-1 text-[10px] font-medium text-white">
                  {post.category}
                </span>
              )}
            </div>

            <span className="text-sm font-bold">
              {post.currentAmount || "8,700"} / {post.targetAmount || "14,000"}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default TimelineCard;
