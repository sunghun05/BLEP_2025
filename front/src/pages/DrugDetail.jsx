import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./DrugDetail.css"

function ReviewCard({ text, type }) {
  const className = `review-card ${type === 'positive' ? 'positive' : 'negative'}`;
  return (
    <blockquote className={className}>
      <p>{text}</p>
    </blockquote>
  );
}

function SectionTitle({ children }) {
  return <h3 className="section-title">{children}</h3>;
}

export default function DrugDetail() {
  const { term } = useParams();

  const { data, error, loading } = useFetch(
    `/api/find?drugName=${encodeURIComponent(term)}`
  );

  return (
    <div className="screen">
      {console.log(term)}
      <div className="safe-area">
        <header className="header">

          <h1 className="title" style={{ textTransform: "capitalize" }}>
            {data ? data.drugName : term}
          </h1>
          <p className="subtitle">
            {data ? data.genericName : "서버에서 데이터를 가져옵니다."}
          </p>
        </header>

        <main style={{ padding: "1rem", display: "grid", gap: "2rem" }}>
          {loading && (
            <div className="detail-card">
              로딩 중…
            </div>
          )}

          {error && (
            <div className="detail-card error-card">
              에러: {error.message}
            </div>
          )}

          {!loading && !error && !data && (
            <div className="detail-card">
              데이터가 없습니다.
            </div>
          )}
          
          {!loading && !error && data && (
            <>
              {/* ===== 1. 요약 정보 카드 ===== */}
              <section className="detail-card">
                <dl className="stats-grid">
                  <dt>평점</dt>
                  <dd>⭐ {data.rating} / 10</dd>
                  <dt>브랜드명</dt>
                  <dd>{data.brandNames}</dd>
                  <dt>약물 분류</dt>
                  <dd>{data.drugClasses}</dd>
                  <dt>유형</dt>
                  <dd>{data.rxOtc === 'Rx' ? '처방 필요' : ('OTC' ? '처방 불필요' : 'Rx/OTC' ? '경우에 따라 다름' : 'error')} (임신: {data.pregnancyCategory})</dd>
                  <dt>알코올</dt>
                  <dd>{data.alcohol === 'X' ? '주의 필요' : '정보 없음'}</dd>
                </dl>
              </section>

              {/* ===== 2. 관련 증상 ===== */}
              <section>
                <SectionTitle>관련 증상</SectionTitle>
                <div className="tag-list">
                  {data.condition.map((c) => (
                    <span key={c} className="tag">{c}</span>
                  ))}
                </div>
              </section>

              {/* ===== 4. 부작용 정보 ===== */}
              <section>
                <SectionTitle>주요 부작용 정보</SectionTitle>
                <div className="side-effects-box">
                  <p>{data.sideEffects}</p>
                </div>
              </section>

              {/* ===== 3. 사용자 리뷰 ===== */}
              <section>
                <SectionTitle>사용자 리뷰</SectionTitle>
                <div className="review-summary">
                  <span>👍 긍정: {data.positiveReviewsSize}</span>
                  <span>👎 부정: {data.negativeReviewsSize}</span>
                </div>

                {/* 긍정 리뷰 */}
                <h4 className="review-subtitle positive">
                  긍정 리뷰 ({data.positiveReviewsSize})
                </h4>
                <div className="review-list">
                  {data.positiveReviews.map((review, i) => (
                    <ReviewCard key={`p-${i}`} type="positive" text={review} />
                  ))}
                </div>

                {/* 부정 리뷰 */}
                <h4 className="review-subtitle negative">
                  부정 리뷰 ({data.negativeReviewsSize})
                </h4>
                <div className="review-list">
                  {data.negativeReviews.map((review, i) => (
                    <ReviewCard key={`n-${i}`} type="negative" text={review} />
                  ))}
                </div>
              </section>

            </>
          )}
        </main>

        <footer className="footer">
          <Link to="/" className="underline">← 홈으로</Link>
        </footer>
      </div>
    </div>
  );
}