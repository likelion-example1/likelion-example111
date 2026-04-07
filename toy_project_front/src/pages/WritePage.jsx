import { Link } from 'react-router-dom'; // 이게 있어야 Link 컴포넌트를 사용 가능
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Input';

import TextArea from '../Components/TextArea'; 
import Button from '../Components/Button';


function WritePage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [deliveryFee, setDeliveryFee] = useState('');
  
    // 키워드는 여러 개 선택할 수 있으므로 배열([])로 상태 만들기
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    // mock 키워드
    // 화면에 보여줄 가상의 키워드 목록
    const locationOptions = ['정문', '후문', '기숙사', '도서관', 'ECC', '기타'];
    const categoryOptions = ['한식', '중식', '일식', '양식', '분식', '카페'];


    // 사진 업로드 시
    const handleImageClick = () => {
    fileInputRef.current.click();
    };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`${file.name} 사진이 첨부되었습니다!`);
      }
    };

    // 수령 장소 키워드 클릭 (토글 기능)
  const toggleLocation = (location) => {
    if (selectedLocations.includes(location)) {
      // 이미 선택된 거라면 배열에서 뺌
      setSelectedLocations(selectedLocations.filter(item => item !== location));
    } else {
      // 선택 안 된 거라면 배열에 추가
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // 메뉴 카테고리 키워드 클릭 (토글 기능)
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 완료 버튼 클릭 (제출)
  const handleSubmit = () => {
    if (!title || !description) {
      alert('제목과 설명을 입력해주세요.');
      return;
    }
    alert('게시글이 성공적으로 작성되었습니다!');
    navigate('/'); // 완료 후 홈 화면으로 이동
  };
 
    return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <img 
          src="/icons/back.png" 
          alt="뒤로가기" 
          onClick={() => navigate('/')}
          style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '12px', marginRight: '12px' }}
        />
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '6px' }}>글 쓰기</p>
        <Button onClick={handleSubmit} >완료</Button>
      </header>

      <main>
        {/* 식당 사진 */}
        <section>
          <div 
            onClick={handleImageClick}
            style={{ width: '80px', height: '80px', backgroundColor: '#E0E0E0', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
          >
            <span style={{ color: '#888' }}>📷</span>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            style={{ display: 'none' }} 
          />
        </section>

        {/* 글 제목 */}
        <section>
          <h4 style={{ marginBottom: '8px' }}>글 제목</h4>
          <Input 
            type="text" 
            placeholder="글 제목을 입력해주세요" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </section>

        {/* 자세한 설명 */}
        <section>
          <h4 style={{ marginBottom: '8px' }}>자세한 설명</h4>
          <TextArea 
            placeholder="메뉴, 자세한 위치 등 본문 내용 입력" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={5} // 여러 줄을 입력할 수 있게 설정
          />
        </section>

        {/* 금액 입력 (원) */}
        <section style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ marginBottom: '8px' }}>최소주문금액</h4>
            <div style = {{ display: 'flex'}}>
              <Input 
                type="number" 
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)} 
              />
              <span>원</span>
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <h4 style={{ marginBottom: '8px' }}>배달비</h4>
              <div style = {{ display: 'flex'}}>
              <Input 
                type="number" 
                value={deliveryFee} 
                onChange={(e) => setDeliveryFee(e.target.value)} 
              />
              <span>원</span>
              </div>
            </div>
        </section>

        {/* 수령 장소 키워드 */}
        <section>
          <h4 style={{ marginBottom: '8px' }}>수령 장소</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {locationOptions.map((location, index) => (
              <button 
                key={index}
                onClick={() => toggleLocation(location)}
                // 선택된 상태면 진한 회색, 아니면 연한 회색으로 스타일 변경 (토글 기능!!)
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedLocations.includes(location) ? '#888' : '#E0E0E0',
                  color: selectedLocations.includes(location) ? '#fff' : '#333',
                  cursor: 'pointer'
                }}
              >
                {location}
              </button>
            ))}
          </div>
        </section>

        {/* 메뉴 카테고리 키워드 */}
        <section>
          <h4 style={{ marginBottom: '8px' }}>메뉴 카테고리</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categoryOptions.map((category, index) => (
              <button 
                key={index}
                onClick={() => toggleCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedCategories.includes(category) ? '#888' : '#E0E0E0',
                  color: selectedCategories.includes(category) ? '#fff' : '#333',
                  cursor: 'pointer'
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

export default WritePage;