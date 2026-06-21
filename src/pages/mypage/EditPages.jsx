import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // tanStack Query 사용
import api from "../../api.js";

import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import GNB from "../../Components/GNB";

import useToastStore from "../../store/useToastStore.js";

// WritePage와 거의 동일한 구조. 기존 게시글 데이터 받아와서 수정하는 게 차이점.

function EditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const showToast = useToastStore((state) => state.showToast);

  const queryClient = useQueryClient();

  // MyPagePosts에서 넘겨준 게시글 데이터 받기
  const postToEdit = location.state?.post || {};

  const locationOptions = [
    "ECC",
    "조형대",
    "공대",
    "포스코관",
    "연구협력관",
    "학관",
    "학문관",
    "중앙도서관",
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

  // 백엔드 필드 명세와 기존 가상 데이터를 결합
  const [title, setTitle] = useState(postToEdit.title || "제목이 없습니다.");

  const [description, setDescription] = useState(
    postToEdit.body || "내용이 없습니다.",
  );

  const [minPrice, setMinPrice] = useState(
    postToEdit.min_order_amount ? String(postToEdit.min_order_amount) : "14000"
  );
  const [deliveryFee, setDeliveryFee] = useState(
    postToEdit.delivery_fee ? String(postToEdit.delivery_fee) : "0"
  );

  // keywords 처리
  const safeKeywords = postToEdit.keywords || ["없음", "없음"];

  const initialLocations = postToEdit.location
    ? [postToEdit.location]
    : safeKeywords.filter((kw) => locationOptions.includes(kw));

  const initialCategories = postToEdit.category
    ? [postToEdit.category]
    : safeKeywords.filter((kw) => categoryOptions.includes(kw));

  // undefined 에러가 나지 않게 분리된 배열을 넣기
  const [selectedLocations, setSelectedLocations] = useState(initialLocations);
  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);

  // useMutation 정의 (게시글 수정 연동 및 관련 캐시 전부 무효화)
  const editPostMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.put(`/posts/${postToEdit.id}/`, payload);
      return response.data;
    },
    onSuccess: () => {
      // 수정 시, 연관된 모든 페이지의 캐시를 무효화하여 최신 데이터로 강제 갱신
      queryClient.invalidateQueries({ queryKey: ["posts"] });          // HomePage (전체 글 목록)
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });        // MyPagePosts (내가 쓴 글 목록)
      queryClient.invalidateQueries({ queryKey: ["matchingHistory"] }); // MyPageHistory (매칭 기록 목록)
      queryClient.invalidateQueries({ queryKey: ["chats"] });          // ChatListPage (채팅방 목록)
      
      // 캐시 삭제
      queryClient.invalidateQueries({ queryKey: ["postDetail", postToEdit.id] });

      showToast("게시글이 수정되었습니다.");
      navigate("/mypage/posts");
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
      showToast("게시글 수정에 실패했습니다.");
    },
  });

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) showToast(`${file.name} 사진이 첨부되었습니다!`);
  };

  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location],
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  // 게시글 수정 완료 처리 (PUT)
  const handleSubmit = async () => {
    if (!title || !description) {
      showToast("제목과 설명을 입력해주세요.");
      return;
    }

    if (!postToEdit.id) {
      showToast("수정할 게시글 정보를 찾을 수 없습니다.");
      return;
    }

      const payload = {
        title: title,
        body: description,
        location: selectedLocations[0] || "없음", // 단일 선택 매핑 처리
        category: selectedCategories[0] || "없음", // 단일 선택 매핑 처리
        language: 1, // API 필수값
        min_order_amount: parseInt(minPrice.replace(/,/g, ""), 10) || 0,
        delivery_fee: parseInt(deliveryFee.replace(/,/g, ""), 10) || 0,
      };

      console.log("벡엔드로 전달하기 직전의 payload:", payload);

      // Mutation 트리거 실행
    editPostMutation.mutate(payload);
  };

  return (
    <div className="font-sf min-h-screen bg-white pb-28">
      {/* --- 상단 헤더 --- */}

      <header className="flex items-center gap-4 px-6 pt-10 pb-4">
        <img
          src="/icons/back.svg"
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-5 w-5 cursor-pointer"
        />

        <h1 className="text-xl font-bold text-black">글 수정</h1>
      </header>

      <main className="px-6 py-4">
        {/* 사진 업로드 + 완료 버튼 */}

        <section className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              onClick={handleImageClick}
              className="bg-gray-7 hover:bg-gray-2 flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl transition-colors"
            >
              <img
                src="/images/FoodPhoto.png"
                alt="이미지"
                className="h-30 w-25"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="-mt-20 px-8 py-2.5">
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

        {/* --- 글 제목 --- */}

        <section className="mb-6">
          <h4 className="text-blue-main mb-3 text-[15px] font-bold">글 제목</h4>

          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-7 font-bold text-black"
          />
        </section>

        {/* --- 자세한 설명 --- */}

        <section className="mb-6">
          <h4 className="text-blue-main mb-3 text-[15px] font-bold">
            자세한 설명
          </h4>

          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-7 h-32 font-bold text-black"
          />
        </section>

        {/* --- 금액 입력 (2분할) --- */}

        <section className="mb-6 grid grid-cols-1 gap-6">
          <div>
            <h4 className="text-blue-main mb-3 text-[15px] font-bold">
              최소주문금액
            </h4>

            <div className="relative flex items-center">
              <Input
                type="text"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="bg-gray-7 pr-10 font-bold text-black"
              />

              <span className="text-gray-4 absolute right-4 text-sm font-bold">
                원
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-blue-main mb-3 text-[15px] font-bold">
              배달비
            </h4>

            <div className="relative flex items-center">
              <Input
                type="text"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="bg-gray-7 pr-10 font-bold text-black"
              />

              <span className="text-gray-4 absolute right-4 text-sm font-bold">
                원
              </span>
            </div>
          </div>
        </section>

        {/* --- 수령 장소 --- */}

        <section className="mb-6">
          <h4 className="text-blue-main mb-3 text-[15px] font-bold">
            수령 장소
          </h4>

          <div className="flex flex-wrap gap-2.5">
            {locationOptions.map((location) => (
              <button
                key={location}
                onClick={() => toggleLocation(location)}
                className={`rounded-lg px-4 py-1.5 text-[13px] font-bold transition-all ${
                  selectedLocations.includes(location)
                    ? "bg-blue-bg text-blue-main shadow-sm"
                    : "bg-gray-7 hover:bg-gray-2 text-black"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </section>

        {/* --- 메뉴 카테고리 --- */}

        <section className="mb-10">
          <h4 className="text-blue-main mb-3 text-[15px] font-bold">
            메뉴 카테고리
          </h4>

          <div className="flex flex-wrap gap-2.5">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`rounded-lg px-4 py-1.5 text-[13px] font-bold transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-blue-bg text-blue-main shadow-sm"
                    : "bg-gray-7 hover:bg-gray-2 text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 네비게이션 바 */}

      <GNB />
    </div>
  );
}

export default EditPage;
