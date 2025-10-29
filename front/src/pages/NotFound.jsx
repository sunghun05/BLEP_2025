import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="screen">
      <div className="safe-area" style={{ textAlign: "center" }}>
        <h1 className="title">페이지를 찾을 수 없습니다</h1>
        <p className="subtitle">주소를 확인해주세요.</p>
        <div style={{ marginTop: 16 }}>
          <Link to="/" className="underline">홈으로 가기</Link>
        </div>
      </div>
    </div>
  );
}
