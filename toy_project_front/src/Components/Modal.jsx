import useModalStore from "../store/useModalStore";

const Modal = () => {
  const {
    isOpen,
    content,
    showImage,
    onAccept,
    onReject,
    acceptText,
    rejectText,
    closeModal,
  } = useModalStore();

  if (!isOpen) return null;

  // 수락/확인 버튼
  const handleAccept = () => {
    if (onAccept) onAccept();
    closeModal();
  };

  // 거절/취소 버튼
  const handleReject = () => {
    if (onReject) onReject();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-[1px]">
      <div className="flex w-70 transform flex-col items-center overflow-hidden rounded-2xl bg-white pt-8 shadow-xl transition-all">
        {/* 사진이 있을 때만 렌더링 */}
        {showImage && (
          <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
            <img
              src="/images/CharacterProfile.png"
              alt="프로필"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* 텍스트 내용: 페이지에서 전달받은 content를 출력 */}
        <p
          className={`mb-8 px-6 text-center text-[16px] leading-relaxed font-bold text-black ${!showImage ? "mt-4" : ""}`}
        >
          {content}
        </p>

        <div className="border-gray-2 flex w-full border-t bg-gray-50">
          <button
            onClick={handleReject}
            className="border-gray-2 text-gray-4 flex-1 border-r py-3.5 text-[15px] font-bold transition-colors hover:bg-gray-200"
          >
            {rejectText}
          </button>
          <button
            onClick={handleAccept}
            className="text-blue-main flex-1 py-3.5 text-[15px] font-bold transition-colors hover:bg-blue-50"
          >
            {acceptText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
