const ChatRoomCard = ({ room, onClick }) => {
  // '매칭 중'인지 확인하여 파란색 테마를 쓸지, 회색 테마를 쓸지 결정
  const isOngoing = room.status === "매칭 중";
  const isSender = room.role === "sender";

  return (
    <div
      onClick={onClick}
      className="border-gray-2 cursor-pointer border-b py-6 transition-colors hover:bg-gray-50"
    >
      {/* 상단: 상태 및 매칭신청 버튼 */}
      <div className="mb-2 flex items-start justify-between">
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isOngoing ? "bg-blue-main" : "bg-gray-4"}`}
          ></span>
          <span
            className={`text-[13px] font-bold ${isOngoing ? "text-blue-main" : "text-gray-4"}`}
          >
            {room.status}
          </span>
        </div>

        <div className="relative">
          {/* 내가 보낸/받은 메시지에 따라 다르게 */}
          {isSender && isOngoing ? (
            <button className="bg-blue-bg rounded-lg px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all">
              매칭 대기 중
            </button>
          ) : (
            <button
              className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all ${
                isOngoing && room.newRequests > 0
                  ? "bg-blue-main text-white shadow-sm"
                  : "bg-gray-2 text-white"
              }`}
            >
              새로운 매칭신청
            </button>
          )}

          {/* 보낸 사람이 아닐 때만 빨간색 알림 숫자 표시 */}
          {!isSender && isOngoing && room.newRequests > 0 ? (
            <span className="bg-red absolute -top-1.5 -right-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {room.newRequests}
            </span>
          ) : (
            !isSender &&
            isOngoing && (
              <span className="absolute -top-1.5 -right-1.5 rounded-md bg-[#C27E7E] px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                0
              </span>
            )
          )}
        </div>
      </div>

      {/* 식당 제목 */}
      <h3 className="-mt-3 mb-2 text-[26px] font-bold text-black">
        {room.restaurantName || room.title}
      </h3>

      {/* 태그 영역 */}
      <div className="mb-6 flex gap-2">
        {room.locations?.map((loc, i) => (
          <span
            key={`loc-${i}`}
            className="bg-blue-bg rounded-full px-3 py-1 text-xs font-bold text-black"
          >
            {loc}
          </span>
        ))}
        {room.categories?.map((cat, i) => (
          <span
            key={`cat-${i}`}
            className="bg-blue-bg rounded-full px-3 py-1 text-xs font-bold text-black"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* 하단: 프로필 이미지 + 이름 + 겹친 프로필 + 금액 + 메시지 */}
      <div className="-mt-3 flex items-end justify-between">
        {/* 내 프로필과 이름 */}
        <div className="flex items-center gap-3">
          <div className="h-15 w-15 overflow-hidden rounded-full">
            {/* 프로젝트 내 프로필 사진 경로로 변경 가능 */}
            <img
              src="/images/CharacterProfile.png"
              alt="프로필"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-bold text-black">{room.author}</span>
        </div>

        {/* 겹친 참여자, 금액, 마지막 메시지 */}
        <div className="flex flex-col items-end gap-1.5">
          {/* 겹치는 프로필 렌더링 */}
          <div className="mb-1 flex">
            {room.participants?.map((_, i) => (
              <div
                key={i}
                className={`h-9 w-9 rounded-full border-2 border-white bg-gray-200 shadow-sm ${i > 0 ? "-ml-3" : ""}`}
              ></div>
            ))}
          </div>
          <span className="text-[15px] font-bold tracking-tight text-black">
            {room.currentAmount} / {room.targetAmount}
          </span>
          <span className="text-gray-4 text-[15px] font-medium">
            {room.lastMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomCard;
