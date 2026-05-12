import { useState } from "react";

const TimelineCard = ({ post, isMyPost }) => {
  // 알림창 표시 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 매칭 신청 완료 여부
  const [isApplied, setIsApplied] = useState(false);
  return (
    <>
      {/* 매칭 신청하기 버튼 위치 때문에 relative, mt-4를 준다 */}
      <article className="bg-gray-7 relative mt-4 flex gap-4 rounded-2xl p-4 shadow">
        {/* 우측 상단 '매칭 신청하기' 버튼 */}
        <div
          onClick={() => !isMyPost && !isApplied && setIsModalOpen(true)}
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

      {/* 매칭 신청하기 버튼 클릭 시 나타나는 모달창 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4">
          {/* 하얀색 알림창 박스 */}
          <div className="w-72 overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* 텍스트 영역 */}
            <div className="px-4 py-8 text-center">
              <p className="text-lg font-bold text-black">
                '{post.restaurantName}'에
              </p>
              <p className="text-lg font-bold text-black">
                매칭신청을 보내시겠습니까?
              </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-r border-gray-200 py-3 text-base font-medium text-gray-500 hover:bg-gray-50"
              >
                아니오
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsApplied(true);
                }}
                className="flex-1 py-3 text-base font-bold text-black hover:bg-gray-50"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimelineCard;
