import { useState } from "react";

const TextInput = ({ style, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      className="pf-input"
      style={
        focused
          ? {
              borderColor: "#2563eb",
              boxShadow: "0 0 0 3px rgba(37,99,235,0.12)",
              ...style,
            }
          : style
      }
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};

export default TextInput;
