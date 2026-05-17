import { useState } from "react";

const SelectInput = ({ children, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      className="pf-select"
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
    >
      {children}
    </select>
  );
};

export default SelectInput;
