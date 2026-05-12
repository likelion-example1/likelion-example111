import { useState } from "react";
import { useNavigate } from "react-router-dom";

{
  /* 이 페이지는 대대적인 수정이 필요할 듯!!! 검색 페이지는 검색창과 키워드 필터 버튼들로 구성 */
}
function SearchPage() {
  const navigate = useNavigate();

  // 검색창에 직접 타이핑하는 텍스트
  const [searchText, setSearchText] = useState("");

  // 아래 필터 버튼을 눌러 선택된 키워드들을 담는 배열
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // 화면에 띄워줄 필터 버튼 항목들
  const locationOptions = [
    "ECC",
    "조형대",
    "공대",
    "포스코관",
    "연구협력관",
    "학관",
    "학문관",
    "중앙도서관",
    "기타",
  ];
  const categoryOptions = [
    "한식",
    "분식",
    "양식",
    "중식",
    "일식",
    "샐러드",
    "디저트 및 음료",
  ];

  // 필터 버튼을 클릭했을 때 배열에 추가하거나 빼는 함수
  const toggleKeyword = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      // 이미 선택된 키워드면 배열에서 제거 (선택 해제)
      setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
    } else {
      // 선택되지 않은 키워드면 배열 끝에 추가
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  // 검색창 안의 키워드 칩에서 'X' 버튼을 눌렀을 때 삭제하는 함수
  const removeKeyword = (keywordToRemove) => {
    setSelectedKeywords(selectedKeywords.filter((k) => k !== keywordToRemove));
  };

  // 돋보기 버튼을 눌렀을 때 실행될 검색 함수
  const handleSearch = () => {
    navigate("/", {
      state: {
        searchKeywords: selectedKeywords,
        searchText: searchText,
      },
    });
  };

  return (
    <div className="font-sf min-h-screen bg-white px-6 pt-12 pb-20">
      <header className="mb-6 flex items-center gap-2">
        <img
          src="/icons/back.svg"
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-5 w-5 cursor-pointer"
        />
        <h1 className="text-xl font-bold text-black">검색하기</h1>
      </header>

      {/* 검색창 뼈대 (키워드 칩 + 텍스트 입력창 + 돋보기 아이콘) */}
      <div className="bg-blue-bg mb-10 flex flex-wrap items-center gap-2 rounded-xl p-3 shadow-sm">
        {/* 선택된 키워드가 있다면 검색창 안에 '칩' 형태로 보여줌 */}
        {selectedKeywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-black shadow-sm"
          >
            <span>{keyword}</span>
            <button
              onClick={() => removeKeyword(keyword)}
              className="text-gray-5 text-3 font-bold"
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
          className="text-blue-main placeholder:text-blue-main/60 w-100 flex-1 bg-transparent text-[15px] font-medium outline-none"
          placeholder={
            selectedKeywords.length > 0 ? "" : "검색어를 입력해주세요."
          }
        />

        {/* 돋보기 버튼 */}
        <button onClick={handleSearch}>
          <img
            src="/icons/Search.svg"
            alt="검색"
            className="h-6 w-6 opacity-80"
          />
        </button>
      </div>

      <main>
        {/* 수령 장소 */}
        <section className="mb-10">
          <h4 className="text-blue-main text-4 mb-4 font-bold">수령 장소</h4>
          <div className="flex flex-wrap gap-2.5">
            {locationOptions.map((location, index) => (
              <button
                key={index}
                onClick={() => toggleKeyword(location)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  selectedKeywords.includes(location)
                    ? "bg-gray-1 text-white shadow-sm" //
                    : "bg-gray-7 hover:bg-gray-2 text-black"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </section>

        {/* 메뉴 카테고리 */}
        <section>
          <h4 className="text-blue-main text-4 mb-4 font-bold">
            메뉴 카테고리
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {categoryOptions.map((category, index) => (
              <button
                key={index}
                onClick={() => toggleKeyword(category)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  selectedKeywords.includes(category)
                    ? "bg-gray-1 text-white shadow-sm"
                    : "bg-gray-7 hover:bg-gray-2 text-black"
                }`}
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
