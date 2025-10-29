import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Autocomplete from "../components/Autocomplete";

export default function Symptom() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleSelect = (v) => {
    navigate(`/detail/condition/${v}`);
  };

  const data_list = useFetch('/api/condition')
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
          <h1 className="title">증상으로 검색</h1>
          <p className="subtitle">예: Depression, Acne …</p>
        </header>

        <main style={{ padding: 14 }}>
          <Autocomplete
            value={q}
            onChange={setQ}
            onSelect={handleSelect}
            data={data_list.data}
            minChars={1}
            maxItems={12}
            placeholder="예: Deep, Hyper, Acne…"
          />

        </main>

        <footer className="footer">
          <Link to="/" className="underline">← 뒤로</Link>
        </footer>
      </div>
    </div>
  );
}
