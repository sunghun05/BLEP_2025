import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Autocomplete (literal prefix only, case-sensitive)
 * - data: 문자열 배열 (그대로 매칭)
 * - onSelect: (value) => void
 * - normalization(공백 제거/소문자화) 일절 안 함
 */
export default function Autocomplete({
  value,
  onChange,
  onSelect,
  data = [],
  minChars = 1,
  maxItems = 8,
  placeholder = "검색어를 입력하세요",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  // 🔹 값 그대로(대소문자/공백 포함) 앞글자 일치만
  const filtered = useMemo(() => {
    if (!value || value.length < minChars) return [];
    // 문자열 그대로 startsWith
    const arr = (Array.isArray(data) ? data : []).filter((x) =>
      typeof x === "string" && x.startsWith(value)
    );
    // 중복 제거 + 개수 제한
    const uniq = [...new Set(arr)];
    return uniq.slice(0, maxItems);
  }, [value, data, minChars, maxItems]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!open || filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      if (highlight >= 0) {
        e.preventDefault();
        const v = filtered[highlight];
        onSelect?.(v);
        setOpen(false);
        setHighlight(-1);
        onChange?.(v); // 선택 시 인풋 값도 해당 텍스트로
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  };

  const handleInput = (e) => {
    onChange?.(e.target.value); // ✨ 그대로 반영 (trim 안 함)
    setOpen(true);
  };

  const handlePick = (v) => {
    onSelect?.(v);
    onChange?.(v);     // 인풋에 그대로
    setOpen(false);
    setHighlight(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`ac-wrap ${className}`} ref={wrapRef}>
      <input
        ref={inputRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (value?.length >= minChars) setOpen(true); }}
        className="ac-input"
        inputMode="search"
        placeholder={placeholder}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-activedescendant={highlight >= 0 ? `ac-item-${highlight}` : undefined}
      />
      {open && filtered.length > 0 && (
        <div className="ac-panel" role="listbox">
          {filtered.map((v, i) => (
            <div
              key={`${v}-${i}`}
              id={`ac-item-${i}`}
              role="option"
              aria-selected={i === highlight}
              className={`ac-item ${i === highlight ? "is-active" : ""}`}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handlePick(v)}
              title={v}
            >
              {v}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}