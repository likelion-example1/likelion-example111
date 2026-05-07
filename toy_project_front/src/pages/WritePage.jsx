import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GNB from "../Components/GNB";

import Input from "../Components/Input";
import TextArea from "../Components/TextArea";
import Button from "../Components/Button";

function WritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");

  // 키워드는 여러 개 선택할 수 있으므로 배열([])로 상태 만들기
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // mock 키워드
  // 화면에 보여줄 가상의 키워드 목록
  const locationOptions = ["정문", "후문", "기숙사", "도서관", "ECC", "기타"];
  const categoryOptions = ["한식", "중식", "일식", "양식", "분식", "카페"];

  // 현재 사용자의 고유 ID
  const currentUserId = 101;

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
      setSelectedLocations(
        selectedLocations.filter((item) => item !== location),
      );
    } else {
      // 선택 안 된 거라면 배열에 추가
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // 메뉴 카테고리 키워드 클릭 (토글 기능)
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 완료 버튼 클릭 (제출)
  const handleSubmit = () => {
    if (!title || !description) {
      alert("제목과 설명을 입력해주세요.");
      return;
    }
    // 홈 화면으로 보낼 '새 글' 데이터 객체
    const newPostData = {
      id: Date.now(),
      restaurantName: title,
      image: "/images/FoodPhoto.png",
      authorId: currentUserId,
      authorName: "김이화",
      lastMessage: "아직 대화가 없습니다.",
      participants: [1],
      currentAmount: "0",
      targetAmount: minPrice || "14,000",
      timeAgo: "방금 전",
      keywords: [...selectedCategories, ...selectedLocations],
    };

    // 홈으로 이동하면서 정보 전달
    navigate("/", {
      state: {
        showToast: true,
        message: "업로드 되었습니다!",
        newPost: newPostData,
      },
    });
  };
  return (
    <div className="font-sf min-h-screen bg-white pb-20">
      <header className="mt-10 mb-4 flex items-center gap-2 px-6">
        <img
          src="/icons/back.svg"
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-5 w-5 cursor-pointer"
        />
        <h1 className="ml-2 text-lg font-bold text-black">글 쓰기</h1>
      </header>

      <main className="px-6 py-4">
        {/* 사진 업로드 */}
        <section className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              onClick={handleImageClick}
              className="flex h-24 w-30 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-100 transition-colors hover:bg-gray-200"
            >
              <span className="text-xl opacity-40">📷</span>
              <span className="mt-1 text-xs font-bold text-gray-400">
                사진 추가
              </span>
            </div>
          </div>

          {/* 완료 버튼 */}
          <Button onClick={handleSubmit} className="mb-12 px-8 py-2">
            완료
          </Button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </section>
        {/* 글 제목 */}
        <section className="mb-8">
          <h4 className="text-blue-main mb-3 text-base font-bold">글 제목</h4>
          <Input
            type="text"
            placeholder="글 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        {/* 자세한 설명 */}
        <section className="mb-8">
          <h4 className="text-blue-main mb-3 text-base font-bold">
            자세한 설명
          </h4>
          <TextArea
            placeholder="메뉴, 자세한 위치 등 본문 내용 입력"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>

        {/* 금액 입력 (원) */}
        <section className="mb-8 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-blue-main mb-3 text-base font-bold">
              최소주문금액
            </h4>
            <div className="relative flex items-center">
              <Input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="pr-10" // 글자가 길어져도 '원'과 겹치지 않게 우측 여백 추가
              />
              <span className="absolute right-4 text-sm font-bold text-black">
                원
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-blue-main mb-3 text-base font-bold">배달비</h4>
            <div className="relative flex items-center">
              <Input
                type="number"
                placeholder="0"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="pr-10"
              />
              <span className="absolute right-4 text-sm font-bold text-black">
                원
              </span>
            </div>
          </div>
        </section>

        {/* 수령 장소 키워드 */}
        <section className="mb-8">
          <h4 className="text-blue-main mb-3 text-base font-bold">수령 장소</h4>
          <div className="flex flex-wrap gap-2">
            {locationOptions.map((location) => (
              <button
                key={location}
                onClick={() => toggleLocation(location)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                  selectedLocations.includes(location)
                    ? "bg-blue-main text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </section>

        {/* 메뉴 카테고리 키워드 */}
        <section className="mb-12">
          <h4 className="text-blue-main mb-3 text-base font-bold">
            메뉴 카테고리
          </h4>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-blue-main text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </main>
      <GNB />
    </div>
  );
}

export default WritePage;
