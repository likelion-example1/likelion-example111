import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import GNB from "../../Components/GNB";

import useToastStore from "../../store/useToastStore";
import useModalStore from "../../store/useModalStore";

function MyPageAccount() {
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);
  const openModal = useModalStore((state) => state.openModal);

  // 파일 업로드 input을 조작하기 위한 hook
  const fileInputRef = useRef(null);

  // 사진과 동일하게 가상 데이터 업데이트
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
      showToast(`${file.name} 사진이 선택되었습니다.`);
    }
  };

  // 완료 버튼 클릭 시 실행
  const handleComplete = () => {
    showToast("정보가 수정되었습니다.");
    navigate("/mypage");
  };

  // 취소 버튼 클릭 시 실행될 모달 호출 함수
  const handleCancelClick = () => {
    openModal({
      content: (
        <>
          취소 시 작성하신 내용이
          <br />
          저장되지 않습니다.
          <br />
          취소하시겠습니까?
        </>
      ),
      showImage: false,
      acceptText: "예",
      rejectText: "아니오",
      onAccept: () => {
        // '예'를 눌렀을 때 마이페이지 메인으로 이동
        navigate("/mypage");
      },
      // '아니오'를 누르면 창만 닫힘
    });
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
              <span className="text-base font-bold text-black">
                현재 비밀번호
              </span>
              <span className="text-base font-bold text-black">|</span>
            </div>
            <span className="text-[15px] font-medium text-gray-500">
              {user.currentPw}
            </span>
          </div>

          {/* 비밀번호 변경 1 */}
          <div className="flex items-center">
            <div className="mr-4 flex w-30 shrink-0 justify-between">
              <span className="text-base font-bold text-black">
                비밀번호 변경
              </span>
              <span className="text-base font-bold text-black">|</span>
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
              <span className="text-base font-bold text-black">
                비밀번호 변경
              </span>
              <span className="text-base font-bold text-black">|</span>
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
            onClick={handleCancelClick} // 취소 버튼 누르면 모달창 열림
            className="bg-gray-3 w-30 rounded-full py-3 text-[15px] font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
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

      <GNB />
    </div>
  );
}

export default MyPageAccount;
