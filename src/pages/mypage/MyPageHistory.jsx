import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import HistoryCard from "../../Components/HistoryCard"; // 리스트에 들어갈 항목들을 카드 컴포넌트로 제작
import GNB from "../../Components/GNB";
import useToastStore from "../../store/useToastStore";

export function MyPageHistory() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  // 현재 선택된 탭 저장 (기본값: '내가 받은')
  const [activeTab, setActiveTab] = useState("received");

  // 매칭 내역 데이터 상태 관리
  const [historyData, setHistoryData] = useState([]);

  // API 연동 및 데이터 분류 로직
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // 내 프로필 정보 가져오기
        const profileResponse = await api.get("/accounts/profile/");
        const myId = profileResponse.data.id || profileResponse.data.pk; 
        const myNickname = profileResponse.data.username || profileResponse.data.name;

        // 전체 게시글 데이터 가져오기
        const postsResponse = await api.get("/posts/");

        // 전체 게시글을 돌면서 '내가 받은' 것과 '내가 보낸' 것을 분류합니다.
        const processedData = postsResponse.data
          .map((post) => {
            // 내가 작성자인 경우
            const isHost = post.host_nickname === myNickname;
            // 내가 작성자가 아니고, 참여자(participants) 목록에 내 ID가 있는 경우
            const isParticipant = !isHost && post.participants?.includes(myId);

            let type = "";
            if (isHost) {
              type = "received"; // 내가 쓴 글 -> 내가 받은 매칭
            } else if (isParticipant) {
              type = "sent"; // 남의 글에 신청함 -> 내가 보낸 매칭
            }

            // 둘 다 해당 안 되면 화면에 보여줄 필요가 없으므로 null 반환
            if (!type) return null;

            return {
              id: post.id,
              type: type,
              author: post.host_nickname || "익명",
              title: post.title,
              content: post.body,
              keywords: [post.category || "없음", post.location || "없음"],
              status: post.status || "매칭 중",
              matchRate: "80%", // 고정값
              price: post.min_order_amount ?? "설정되지 않음",
              photo: post.photo,
              rawPost: post,
            };
          })
          .filter(Boolean); // 배열에서 null로 걸러진 데이터들 삭제

        // 완성된 데이터를 상태에 저장
        setHistoryData(processedData);

      } catch (error) {
        console.error("매칭 내역 조회 실패:", error);
        showToast("매칭 내역을 불러오는 데 실패했습니다.");
      }
    };

    fetchHistoryData();
  }, []);

  // 전체 데이터 중 현재 선택된 탭(activeTab)과 타입이 일치하는 데이터만 걸러내는 함수!
  const filteredData = historyData.filter((post) => post.type === activeTab);

  return (
    <div className="font-sf relative min-h-screen bg-white pt-10 pb-28">
      <header className="mb-4 flex items-center gap-2 px-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-1">
          <img src="/icons/back.svg" alt="뒤로가기" className="h-5 w-5" />
        </button>

        <h1 className="text-xl font-bold text-black">나의 매칭내역</h1>
      </header>

      <main>
        <div className="bg-blue-bg flex gap-3 px-6 py-4">
          <button
            onClick={() => setActiveTab("received")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${
              activeTab === "received"
                ? "bg-blue-main text-white"
                : "bg-white text-black"
            }`}
          >
            내가 받은
          </button>

          <button
            onClick={() => setActiveTab("sent")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${
              activeTab === "sent"
                ? "bg-blue-main text-white"
                : "bg-white text-black"
            }`}
          >
            내가 보낸
          </button>
        </div>

        <section className="px-6">
          {/* 필터링된 매칭 내역 리스트 */}

          {filteredData.length > 0 ? (
            filteredData.map((post) => (
              <HistoryCard key={post.id} post={post} />
            ))
          ) : (
            // 데이터가 없을 때 보여줄 화면 처리

            <div className="text-gray-4 py-16 text-center font-medium">
              매칭 내역이 없습니다.
            </div>
          )}
        </section>
      </main>

      <GNB />
    </div>
  );
}

export default MyPageHistory;
