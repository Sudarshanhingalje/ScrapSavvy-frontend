import { useRef } from "react";

const TagInput = ({ tags, tagInput, setTagInput, onKeyDown, onRemove }) => {
  const inputRef = useRef();

  return (
    <div className="pf-tag-wrap" onClick={() => inputRef.current?.focus()}>
      {tags.map((t, i) => (
        <div key={i} className="pf-tag">
          {t}
          <button
            type="button"
            className="pf-tag__remove"
            onClick={() => onRemove(i)}
            aria-label={`Remove tag ${t}`}
          >
            ×
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={tags.length === 0 ? "Type a tag and press Enter…" : ""}
        style={{
          border: "none",
          outline: "none",
          fontSize: 13,
          flex: 1,
          minWidth: 80,
          background: "transparent",
          color: "#111",
        }}
      />
    </div>
  );
};

export default TagInput;
