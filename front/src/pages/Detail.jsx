import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./Detail.css"
function DrugSummaryCard({ drug }) {
    // 클릭 시 이동할 URL (drugName을 URL 파라미터로 사용)
    const detailUrl = `/drugDetail/${drug.drugName}`;
  
    // 'NaN' 문자열이나 null일 경우 'N/A' 또는 0으로 표시
    const rating = Number(drug.rating) ? drug.rating : 'N/A';
    const genericName = drug.genericName && drug.genericName !== "NaN" 
      ? drug.genericName 
      : '일반명 정보 없음';
    const positiveCount = Number(drug.positiveCount) || 0;
    const negativeCount = Number(drug.negativeCount) || 0;
  
    return (
      <Link to={detailUrl} className="drug-summary-card">
        <div className="card-top">
          <h4 className="drug-name">{drug.drugName}</h4>
          <span className="rating">⭐ {rating}</span>
        </div>
        <p className="generic-name">{genericName}</p>
        <div className="review-counts">
          <span className="positive">👍 {positiveCount}</span>
          <span className="negative">👎 {negativeCount}</span>
        </div>
      </Link>
    );
  }


export default function Detail() {
  const { term } = useParams();

  const [page, setPage] = useState(1);

  // 3. 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= data.endPage) {
      setPage(newPage);
      // 페이지 변경 시 화면 맨 위로 스크롤 (선택 사항)
      window.scrollTo(0, 0);
    }
  };

  const { data, error, loading } = useFetch(
    `/api/find?condition=${term}&page=${page}`
  );
  const drugList = data?.drug || [];
  return (
    <div className="screen">
      <div className="safe-area">
        <header className="header">
          <h1 className="title" style={{ textTransform: "capitalize" }}>
            증상: {term}
          </h1>
          <p className="subtitle">긍정 리뷰가 많은 순서로 정렬됩니다.</p>
        </header>

        {/* 1rem = 16px, 0.75rem = 12px */}
        <main style={{ padding: "1rem", display: "grid", gap: "0.75rem" }}>
          {loading && (
            <div className="detail-card">로딩 중…</div>
          )}

          {error && (
            <div className="detail-card error-card">
              에러: {error.message}
            </div>
          )}

          {!loading && !error && drugList.length === 0 && (
            <div className="detail-card">
              관련 약물 정보가 없습니다.
            </div>
          )}
          
          {/* 정렬된 리스트를 .map()으로 렌더링 */}
          {!loading && !error && drugList.length > 0 && (
            
            drugList.map((drug) => (
              <DrugSummaryCard key={drug.drugName} drug={drug} />
            ))
          )}
        </main>
        
        {/* 6. 페이지네이션 UI */}
        {!loading && data && data.endPage > 1 && (
           <footer className="pagination-footer">
             <button
               onClick={() => handlePageChange(page - 1)}
               disabled={page === 1}
             >
               이전
             </button>
             <span>
               페이지: {data.nowPage} / {data.endPage}
             </span>
             <button
               onClick={() => handlePageChange(page + 1)}
               disabled={page === data.endPage}
             >
               다음
             </button>
           </footer>
        )}

        <footer className="footer">
          <Link to="/" className="underline">← 홈으로</Link>
        </footer>
      </div>
    </div>
  );
}