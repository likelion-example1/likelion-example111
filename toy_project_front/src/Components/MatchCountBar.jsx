const MatchCount = ({ currentCount }) => {
  // 최대 매칭 횟수를 20회로 설정
  const maxCount = 20;
  
  // 현재 매칭 횟수를 퍼센트(%)로 계산
  const percentage = (currentCount / maxCount) * 100;

  return (
    <div style={{ padding: '20px 0' }}>
      
      {/* 회색 배경 바 (전체 게이지) */}
      <div style={{ position: 'relative', height: '8px', backgroundColor: '#E0E0E0', borderRadius: '4px' }}>
        
        {/* 채워진 바 (현재 퍼센트만큼 너비가 늘어남!!) */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, 
          height: '100%', width: `${percentage}%`, 
          backgroundColor: '#A0A0A0', borderRadius: '4px' 
        }}></div>
        
        {/* 동그란 포인트 (현재 위치) */}
        <div style={{
          position: 'absolute', top: '50%', left: `${percentage}%`,
          transform: 'translate(-50%, -50%)', // 포인트를 선의 정중앙에 맞추기 위한 CSS
          width: '16px', height: '16px', 
          backgroundColor: '#888', borderRadius: '50%'
        }}></div>
        
      </div>

      {/* 하단 횟수 라벨들 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '14px', fontWeight: 'bold' }}>
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