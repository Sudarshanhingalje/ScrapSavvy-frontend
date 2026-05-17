import { useState } from "react";

const TextAreaInput = ({ rows = 5, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      rows={rows}
      className="pf-textarea"
      style={
        focused
          ? {
              borderColor: "#2563eb",
              boxShadow: "0 0 0 3px rgba(37,99,235,0.12)",
            }
          : {}
      }
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};

export default TextAreaInput;
