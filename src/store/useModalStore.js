import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  content: "", // 메시지
  showImage: false, // 프로필 이미지 표시 여부
  onAccept: null, // 수락/확인 버튼 클릭 시 실행할 함수
  onReject: null, // 거절/취소 버튼 클릭 시 실행할 함수
  acceptText: "확인", // 버튼 텍스트 기본값
  rejectText: "취소",

  openModal: ({
    content,
    showImage = false,
    onAccept,
    onReject,
    acceptText = "확인",
    rejectText = "취소",
  }) =>
    set({
      isOpen: true,
      content,
      showImage,
      onAccept,
      onReject,
      acceptText,
      rejectText,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      content: "",
      showImage: false,
      onAccept: null,
      onReject: null,
    }),
}));

export default useModalStore;
