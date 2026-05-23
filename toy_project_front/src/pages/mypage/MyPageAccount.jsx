import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import GNB from "../../Components/GNB";

import useToastStore from "../../store/useToastStore.js";
import useModalStore from "../../store/useModalStore";

function MyPageAccount() {
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);
  const openModal = useModalStore((state) => state.openModal);

  // 파일 업로드 input을 조작하기 위한 hook
  const fileInputRef = useRef(null);

  // 상태 관리
  // 프로필 정보
  const [user, setUser] = useState({
    loginId: "",
    nickname: "",
  });

  // 비밀번호 입력 상태
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 계정 정보 불러오기 (GET)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/accounts/profile/");
        console.log("백엔드가 보내준 프로필 데이터:", response.data);

        // 백엔드에서 받은 데이터로 업데이트 (없으면 로딩중...)
        setUser({
          // 백엔드의 'username' 필드를 프론트의 'ID' 자리에
          loginId: response.data.username || "로딩중...",
          // 백엔드의 'nickname' 필드를 '닉네임' 자리에
          nickname: response.data.nickname || response.data.name || "로딩중...",
        });
      } catch (error) {
        console.error("프로필 정보 조회 실패:", error);
      }
    };
    fetchProfile();
  }, []);

  // '사진 업로드' 글씨를 클릭했을 때 실행
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 사용자가 실제 이미지를 선택했을 때 실행
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      showToast(`${file.name} 사진이 선택되었습니다.`);
      // 추후 프로필 사진 변경 API 연동
    }
  };

  // 완료(비밀번호 변경) 버튼 클릭 (PUT)
  const handleComplete = async () => {
    // 유효성 검사
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast("모든 비밀번호 항목을 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 비밀번호 변경 API 요청
      await api.post("/accounts/password-change/", {
        old_password: oldPassword,
        new_password: newPassword,
      });

      showToast("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      const errorMsg =
        error.response?.data?.message ||
        "비밀번호 변경에 실패했습니다. 8자 이상, 영문, 숫자, 특수문자를 혼합했는지 확인해주세요.";
      showToast(errorMsg);
    }
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
              {user.loginId}
            </span>
          </div>

          {/* 닉네임 */}
          <div className="flex items-center">
            <div className="mr-4 flex w-30 shrink-0 justify-between">
              <span className="text-[16px] font-bold text-black">닉네임</span>
              <span className="text-[16px] font-bold text-black">|</span>
            </div>
            <span className="text-[15px] font-medium text-gray-500">
              {user.nickname}
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
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력해주세요."
              className="w-full bg-transparent text-[14px] font-medium text-gray-500 outline-none placeholder:text-gray-400"
            />
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
