import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import GNB from "../../Components/GNB";

// WritePage와 거의 동일한 구조. 기존 게시글 데이터 받아와서 수정하는 게 차이점.
function EditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

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

  // 실제 데이터의 이름표(restaurantName, lastMessage 등)에 맞게 연결
  // 데이터가 없을 때를 대비해 기본값도 넣어줌
  const [title, setTitle] = useState(
    postToEdit.restaurantName || "Waffle It Up",
  );
  const [description, setDescription] = useState(
    postToEdit.lastMessage ||
      "2교시 끝나고 와플잇업에서 배달시키실 분 구합니다! 이번 교시 끝나고 1시 40분쯤 미리 시킬 생각입니당\n여기 젤라또 그린티쿠키랑 딸기밀크티 새로 나왔는데 맛있어용\n포관 오봉도시락 앞에서 픽업해요!!",
  );

  const [minPrice, setMinPrice] = useState(
    postToEdit.targetAmount
      ? postToEdit.targetAmount.replace(/,/g, "") // 금액에 쉼표는 제거
      : "14000",
  );
  const [deliveryFee, setDeliveryFee] = useState(postToEdit.deliveryFee || "0");

  // keywords 배열 하나에 뭉쳐있던 태그들을 '수령장소'와 '카테고리'로 찢기
  const safeKeywords = postToEdit.keywords || ["포스코관", "디저트 및 음료"];
  const initialLocations = safeKeywords.filter((kw) =>
    locationOptions.includes(kw),
  );
  const initialCategories = safeKeywords.filter((kw) =>
    categoryOptions.includes(kw),
  );

  // undefined 에러가 나지 않게 분리된 배열을 넣기
  const [selectedLocations, setSelectedLocations] = useState(initialLocations);
  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) alert(`${file.name} 사진이 첨부되었습니다!`);
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

  const handleSubmit = () => {
    if (!title || !description) {
      alert("제목과 설명을 입력해주세요.");
      return;
    }
    // 수정 완료 후 마이페이지(내가 쓴 글)로 돌아가며 알림 띄우기
    navigate("/mypage/posts", {
      state: {
        showToast: true,
        message: "게시글이 성공적으로 수정되었습니다!",
      },
    });
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
