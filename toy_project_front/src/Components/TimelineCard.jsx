import { useState } from "react";
import useModalStore from "../store/useModalStore";

const TimelineCard = ({ post, isMyPost }) => {
  // 매칭 신청 완료 여부
  const [isApplied, setIsApplied] = useState(false);

  // Zustand 액션 가져오기
  const openModal = useModalStore((state) => state.openModal);

  // 매칭 신청하기 버튼 클릭 시
  const handleApplyClick = () => {
    if (isMyPost || isApplied) return;

    // 전역 모달 띄우기
    openModal({
      content: (
        <>
          '{post.restaurantName}'에
          <br />
          매칭신청을 보내시겠습니까?
        </>
      ),
      showImage: false,
      acceptText: "예",
      rejectText: "아니오",
      onAccept: () => {
        // '예'를 눌렀을 때 상태를 '신청 완료'로 변경
        setIsApplied(true);
      },
    });
  };
  return (
    <>
      {/* 매칭 신청하기 버튼 위치 때문에 relative, mt-4를 준다 */}
      <article className="bg-gray-7 relative mt-4 flex gap-4 rounded-2xl p-4 shadow">
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
            src="/images/FoodPhoto.png"
            alt="식당 사진"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 우측 상세 정보 영역 */}
        <div className="flex flex-1 flex-col justify-between pt-1">
          {/* 식당 이름 */}
          <h3 className="text-right text-lg font-bold">
            {post.restaurantName}
          </h3>

          {/* 메시지 + 겹친 프로필 이미지 */}
          <div className="mt-1 flex items-center justify-end gap-3">
            {/* isApplied 상태에 따라 메시지를 다르게 보여준다 */}
            {isApplied ? (
              <div className="border-gray-2 text-blue-bg rounded-xl border bg-white px-3 py-1 text-xs font-bold shadow-sm">
                매칭신청을 보냈습니다.
              </div>
            ) : (
              <span className="text-gray-4 text-xs font-medium">
                {post.lastMessage}
              </span>
            )}
            <div className="flex">
              {post.participants?.map((_, index) => (
                <img
                  key={index}
                  src="/images/UserProfileExample.png"
                  alt={`참여자 프로필 ${index + 1}`}
                  className={`bg-gray-2 h-6 w-6 rounded-full border border-white object-cover ${
                    index > 0 ? "-ml-2" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 키워드 + 금액 */}
          <div className="mt-3 flex items-end justify-between">
            <div className="flex gap-1.5">
              {post.keywords?.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-3 rounded-full px-2.5 py-1 text-[10px] font-medium text-white"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <span className="text-sm font-bold">
              {post.currentAmount} / {post.targetAmount}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default TimelineCard;
