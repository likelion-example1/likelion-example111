const MatchCount = ({ currentCount }) => {
  // 최대 매칭 횟수를 20회로 설정
  const maxCount = 20;

  // 현재 매칭 횟수를 퍼센트(%)로 계산
  const percentage = (currentCount / maxCount) * 100;

  return (
    <div className="py-5">
      {/* 회색 배경 바 (전체 게이지) */}
      <div className="relative h-2 rounded bg-[#E0E0E0]">
        {/* 채워진 바 (현재 퍼센트만큼 너비가 늘어남!!) */}
        <div
          className="absolute top-0 left-0 h-full rounded bg-[#A0A0A0]"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* 동그란 포인트 (현재 위치) */}
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#888]"
          style={{ left: `${percentage}%` }}
        ></div>
      </div>

      {/* 하단 횟수 라벨들 */}
      <div className="mt-3 flex justify-between text-sm font-bold text-black">
        <span>1회</span>
        <span>5회</span>
        <span>10회</span>
        <span>15회</span>
        <span>20회</span>
      </div>
    </div>
  );
};

export default MatchCount;
