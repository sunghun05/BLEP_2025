import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Autocomplete from "../components/Autocomplete";

export default function Drug() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleSelect = (v) => {
    navigate(`/drugDetail/${encodeURIComponent(v)}`);
  };

  const data_list = useFetch('/api/drugname')
  if (data_list.loading) {
    return (
        <>
            <div className="home-container">
                Loading..
            </div>
        </>
    );
    }

  return (
    <div className="screen">
      <div className="safe-area">
        <header className="header">
          <h1 className="title">약 이름으로 검색</h1>
          <p className="subtitle">예: ibuprofen, metformin…</p>
        </header>

        <main style={{ padding: 14 }}>
          <Autocomplete
                      value={q}
                      onChange={setQ}
                      onSelect={handleSelect}
                      data={data_list.data}             // 로컬 데이터 사용
                      minChars={1}
                      maxItems={12}
                      placeholder="예: ibuprofen, metformin.."
          />
        </main>

        <footer className="footer">
          <Link to="/" className="underline">← 뒤로</Link>
        </footer>
      </div>
    </div>
  );
}
