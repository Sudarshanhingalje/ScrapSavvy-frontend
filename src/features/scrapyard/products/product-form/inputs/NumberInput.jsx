import { useState } from "react";

const NumberInput = ({ prefix, style, ...props }) => {
  const [focused, setFocused] = useState(false);
  const focusStyle = focused
    ? { borderColor: "#2563eb", boxShadow: "0 0 0 3px rgba(37,99,235,0.12)" }
    : {};

  if (prefix) {
    return (
      <div className="pf-prefix-wrap">
        <span className="pf-prefix">{prefix}</span>
        <input
          type="number"
          className="pf-input"
          style={{ paddingLeft: 26, ...focusStyle, ...style }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      type="number"
      className="pf-input"
      style={{ ...focusStyle, ...style }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};

export default NumberInput;
