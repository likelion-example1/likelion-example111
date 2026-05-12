import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GNB from "../../Components/GNB";

function MyPageAccount() {
  const navigate = useNavigate();

  // 파일 업로드 input을 조작하기 위한 hook
  const fileInputRef = useRef(null);

  // 모달창 열림/닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 사진과 동일하게 가상 데이터(mock data) 업데이트
  const user = {
    name: "김이화",
    id: "ewhakim",
    currentPw: "eorudkffjwk123",
  };

  // '사진 업로드' 글씨를 클릭했을 때 실행
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 사용자가 실제 이미지를 선택했을 때 실행
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`${file.name} 사진이 선택되었습니다.`);
    }
  };

  // 완료 버튼 클릭 시 실행
  const handleComplete = () => {
    // 이동할 때 state를 함께 넘겨서 MyPageMain에서 알림을 띄울 수 있게 함
    navigate("/mypage", { state: { showToast: true } });
  };

  return (
    <div className="font-sf relative min-h-screen bg-white pt-10 pb-28">
      {/* 상단 헤더 영역 */}
      <header className="mb-12 flex items-center gap-2 px-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-1">
          <img src="/icons/back.svg" alt="뒤로가기" className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-black">마이페이지</h1>
      </header>

      <main className="px-6">
        {/* 프로필 이미지 영역 */}
        <div className="mb-16 flex flex-col items-center">
          <div className="bg-blue-bg mb-3 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full">
            <img
              src="/images/ProfileDefault.png"
              alt="프로필 이미지"
              className="h-50 w-50 object-contain"
            />
          </div>

          <button
            onClick={handleUploadClick}
            className="text-gray-4 cursor-pointer text-[13px] font-medium underline underline-offset-2"
          >
            사진 업로드
          </button>

          {/* 숨겨진 파일 업로드 input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* 계정 정보 폼 영역 */}
        <div className="flex flex-col gap-10 px-2">
          {/* ID */}
          <div className="flex items-center">
            <div className="mr-4 flex w-30 shrink-0 justify-between">
              <span className="text-[16px] font-bold text-black">ID</span>
              <span className="text-[16px] font-bold text-black">|</span>
            </div>
            <span className="text-[15px] font-medium text-gray-500">
              {user.id}
            </span>
          </div>

          {/* 닉네임 */}
          <div className="flex items-center">
            <div className="mr-4 flex w-30 shrink-0 justify-between">
              <span className="text-[16px] font-bold text-black">닉네임</span>
              <span className="text-[16px] font-bold text-black">|</span>
            </div>
            <span className="text-[15px] font-medium text-gray-500">
              {user.name}
            </span>
          </div>

          {/* 현재 비밀번호 */}
          <div className="flex items-center">
            <div className="mr-4 flex w-30 shrink-0 justify-between">
              <span className="text-[16px] font-bold text-black">
                현재 비밀번호
              </span>
              <span className="text-[16px] font-bold text-black">|</span>
            </div>
            <span className="text-[15px] font-medium text-gray-500">
              {user.currentPw}
            </span>
          </div>

          {/* 비밀번호 변경 1 */}
          <div className="flex items-center">
            <div className="mr-4 flex w-30 shrink-0 justify-between">
              <span className="text-[16px] font-bold text-black">
                비밀번호 변경
              </span>
              <span className="text-[16px] font-bold text-black">|</span>
            </div>
            <input
              type="password"
              placeholder="변경을 원하시는 비밀번호를 입력해주세요."
              className="w-full bg-transparent text-[14px] font-medium text-gray-500 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* 비밀번호 변경 2 */}
          <div className="flex items-center">
            <div className="mr-4 flex w-30 shrink-0 justify-between">
              <span className="text-[16px] font-bold text-black">
                비밀번호 변경
              </span>
              <span className="text-[16px] font-bold text-black">|</span>
            </div>
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              className="w-full bg-transparent text-[14px] font-medium text-gray-500 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="mt-16 flex justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)} // 취소 버튼 누르면 모달창 열림
            className="w-30 rounded-full bg-[#AFAFAF] py-3 text-[15px] font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
          >
            취소
          </button>
          <button
            onClick={handleComplete} // 완료 버튼 누르면 이동
            className="text-blue-main w-30 rounded-full bg-[#B3C5E7] py-3 text-[15px] font-bold shadow-sm transition-transform hover:scale-[1.02]"
          >
            완료
          </button>
        </div>
      </main>

      {/* --- 취소 확인 모달창 --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-10">
          <div className="w-full max-w-sm overflow-hidden rounded-[20px] bg-white shadow-xl">
            <div className="px-6 py-10 text-center">
              <p className="text-[18px] leading-relaxed font-bold text-black">
                취소 시 작성하신 내용이
                <br />
                저장되지 않습니다.
                <br />
                취소하시겠습니까?
              </p>
            </div>
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)} // 아니오: 모달 닫기
                className="flex-1 border-r border-gray-200 py-4 text-[18px] font-medium text-gray-400"
              >
                아니오
              </button>
              <button
                onClick={() => navigate("/mypage")} // 예: 메인으로 이동
                className="flex-1 py-4 text-[18px] font-bold text-black"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
      <GNB />
    </div>
  );
}

export default MyPageAccount;
