import { Link } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <div className="screen">
      <div className="safe-area">
        <header className="header">
          <div className="logo">💊</div>
          <h1 className="title">둘 중 하나를 선택하세요</h1>
          <p className="subtitle">증상으로 찾거나, 약 이름으로 바로 찾아볼 수 있어요</p>
        </header>

        <main className="card-grid">
          <Link className="option-card symptom" to="/symptom">
            <div className="icon-wrap">
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path d="M12 2a5 5 0 0 1 5 5v2h1a3 3 0 1 1 0 6h-1v2a5 5 0 0 1-10 0v-2H6a3 3 0 1 1 0-6h1V7a5 5 0 0 1 5-5z" />
              </svg>
            </div>
            <div className="option-text">
              <span className="label">증상으로 검색</span>
              <span className="hint">예: Deep, Hyper, Acne…</span>
            </div>
          </Link>

          <Link className="option-card drug" to="/drug">
            <div className="icon-wrap">
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path d="M9.17 4.93a4.5 4.5 0 0 1 6.36 0l3.54 3.54a4.5 4.5 0 0 1 0 6.36l-3.54 3.54a4.5 4.5 0 0 1-6.36 0L6.1 14.83a4.5 4.5 0 0 1 0-6.36l3.07-3.54z" />
              </svg>
            </div>
            <div className="option-text">
              <span className="label">약 이름으로 검색</span>
              <span className="hint">예: ibuprofen, metformin…</span>
            </div>
          </Link>
        </main>

        <footer className="footer">
          의료 자문이 아니며, 사용 전 라벨을 확인하세요.
        </footer>
      </div>
    </div>
  );
}

export default App;