import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api.js";
import GNB from "../Components/GNB";

import Input from "../Components/Input";
import TextArea from "../Components/TextArea";
import Button from "../Components/Button";
import useToastStore from "../store/useToastStore";

function WritePage() {
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [min_order_amount, setMinOrderAmount] = useState("");
  const [delivery_fee, setDeliveryFee] = useState("");

  // 키워드는 여러 개 선택할 수 있으므로 배열([])로 상태 만들기
  // 260521, 백엔드 명세에서는 다중 선택이 아니고 단일선택이라 코드 변경. 추후 다중 선택이 맞으면 코드 원상복귀 예정
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // 백엔드 models.py에 정의된 choices와 똑같이 맞춘 태그 목록
  const locationOptions = [
    "ECC",
    "조형대",
    "공대",
    "연협",
    "학관",
    "학문관",
    "중앙도서관",
  ];
  const categoryOptions = [
    "한식",
    "중식",
    "일식",
    "양식",
    "분식",
    "샐러드",
    "디저트_음료",
  ];

  // 사진 업로드 시
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

// 유저가 사진을 선택했을 때 실행되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // 서버로 보낼 파일 원본 저장
      
      // 브라우저에서 임시로 사진을 띄워볼 수 있는 가짜 URL(미리보기용) 생성
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); 
      
      showToast(`${file.name} 사진이 첨부되었습니다!`);
    }
  };

  // 260521 마찬가지로 토글 기능 삭제하고 다중 선택에서 단일 선택으로 변경
  // 수령 장소 선택
  const handleLocationSelect = (location) => {
    // 이미 선택된 것을 누르면 취소되게 하고, 아니면 새 항목으로 교체
    setSelectedLocation(selectedLocation === location ? "" : location);
  };

  // 메뉴 카테고리 선택
  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  // 완료 버튼 클릭 (제출)
  const handleSubmit = async () => {
    if (!title || !description || !selectedLocation || !selectedCategory) {
      showToast("제목과 설명, 수령 장소, 카테고리를 모두 입력해주세요.");
      return;
    }
    setIsLoading(true);

try {
      // 사진을 포함하여 데이터를 보내기 위해 FormData 객체 생성
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", description);
      formData.append("location", selectedLocation);
      formData.append("category", selectedCategory);
      formData.append("language", 1); // 1: KOR
      formData.append("min_order_amount", min_order_amount || 0);
      formData.append("delivery_fee", delivery_fee || 0);
      
      // 사진 파일이 존재할 경우에만 백엔드의 'photo' 필드 이름에 맞춰 추가
      if (imageFile) {
        formData.append("photo", imageFile);
      }

      // formData를 통째로 전송
      const response = await api.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("글 작성 성공:", response.data);

      navigate("/", {
        state: {
          showToast: true,
          message: "업로드 되었습니다!",
          newPost: response.data,
        },
      });
    } catch (error) {
      console.error("글 작성 실패:", error);
      showToast("글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
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
              className="flex h-24 w-30 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-100 transition-colors hover:bg-gray-200"
            >
              {/* 미리보기 이미지가 있으면 띄우고, 없으면 default 표시 */}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="업로드 미리보기"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <span className="text-xl opacity-40">📷</span>
                  <span className="mt-1 text-xs font-bold text-gray-400">
                    사진 추가
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 완료 버튼 */}
          <Button
            onClick={handleSubmit}
            className="mb-12 transform cursor-pointer px-8 py-2 hover:scale-105"
          >
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
                value={min_order_amount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
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
                value={delivery_fee}
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
            {locationOptions.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleLocationSelect(loc)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                  selectedLocation === loc
                    ? "bg-blue-main text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {loc}
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
                onClick={() => handleCategorySelect(category)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                  selectedCategory === category
                    ? "bg-blue-main text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {/* 백엔드 내 디저트_음료를 디저트 및 음료로 변경*/}
                {category === "디저트_음료" ? "디저트 및 음료" : category}
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
