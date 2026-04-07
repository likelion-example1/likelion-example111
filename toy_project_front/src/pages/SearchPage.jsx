import { Link } from 'react-router-dom'; // 이게 있어야 Link 컴포넌트를 사용 가능
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

{  /* 이 페이지는 대대적인 수정이 필요할 듯!!! 검색 페이지는 검색창과 키워드 필터 버튼들로 구성 */}
function SearchPage() {
  const navigate = useNavigate();

  // 검색창에 직접 타이핑하는 텍스트
  const [searchText, setSearchText] = useState('');

  // 아래 필터 버튼을 눌러 선택된 키워드들을 담는 배열
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // 화면에 띄워줄 필터 버튼 항목들
  const locationOptions = ['정문', '후문', '기숙사', '도서관', 'ECC', '기타'];
  const categoryOptions = ['한식', '중식', '일식', '양식', '분식', '카페']; 
  

  // 필터 버튼을 클릭했을 때 배열에 추가하거나 빼는 함수
  const toggleKeyword = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      // 이미 선택된 키워드면 배열에서 제거 (선택 해제)
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      // 선택되지 않은 키워드면 배열 끝에 추가
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  // 검색창 안의 키워드 칩에서 'X' 버튼을 눌렀을 때 삭제하는 함수
  const removeKeyword = (keywordToRemove) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keywordToRemove));
  };

  // 돋보기 버튼을 눌렀을 때 실행될 검색 함수
  const handleSearch = () => {
    alert(`직접 입력한 검색어: ${searchText}\n선택된 필터: ${selectedKeywords.join(', ')}`);
  };


  return (
    <div>
      <header>
        <img 
          src="/icons/back.png" 
          alt="뒤로가기" 
          onClick={() => navigate('/')}
          style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '12px', marginRight: '12px', marginBottom: '12px' }}
        />

        {/* 검색창 뼈대 (키워드 칩 + 텍스트 입력창 + 돋보기 아이콘) */}
        <div style={{ 
          display: 'flex', alignItems: 'center', flex: 1, flexWrap: 'wrap',
          backgroundColor: '#F2F2F2', padding: '8px 12px', borderRadius: '10px', gap: '8px' 
        }}>
          
          {/* 선택된 키워드가 있다면 검색창 안에 '칩' 형태로 보여줌 */}
          {selectedKeywords.map((keyword, index) => (
            <div key={index} style={{ 
              display: 'flex', alignItems: 'center', gap: '4px',
              border: '1px solid #666', borderRadius: '10px', padding: '4px 8px', fontSize: '12px' 
            }}>
              <span>{keyword}</span>
              <button 
                onClick={() => removeKeyword(keyword)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '10px' }}
              >
                X
              </button>
            </div>
          ))}

          {/* 실제 텍스트를 입력하는 투명한 창 */}
          <input 
            type="text" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ 
              border: 'none', background: 'transparent', outline: 'none', 
              flex: 1, minWidth: '80px', fontSize: '14px' 
            }} 
          />

          {/* 검색 (돋보기) 버튼 */}
          <button 
            onClick={handleSearch} 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
          <img 
          src="/icons/search.png" 
          alt="검색" 
          style={{ width: '20px', height: '20px'}}
        />
          </button>

        </div>
      </header>

      <main>
        <section>
          <h4 style={{ margin: '12px 0 12px 0', fontSize: '16px' }}>수령 장소</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {locationOptions.map((location, index) => (
              <button 
                key={index}
                onClick={() => toggleKeyword(location)}
                style={{
                  padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  backgroundColor: selectedKeywords.includes(location) ? '#888' : '#E0E0E0',
                  color: selectedKeywords.includes(location) ? '#fff' : '#333'
                }}
              >
                {location}
              </button>
            ))}
          </div>
        </section>

        {/* 메뉴 카테고리 필터 */}
        <section>
          <h4 style={{ margin: '12px 0 12px 0', fontSize: '16px' }}>메뉴 카테고리</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categoryOptions.map((category, index) => (
              <button 
                key={index}
                onClick={() => toggleKeyword(category)}
                style={{
                  padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  backgroundColor: selectedKeywords.includes(category) ? '#888' : '#E0E0E0',
                  color: selectedKeywords.includes(category) ? '#fff' : '#333'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}

export default SearchPage;