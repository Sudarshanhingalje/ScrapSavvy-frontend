import { useState } from "react";

export const useTags = (tags, setField) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim().toLowerCase();
      if (val && !tags.includes(val) && tags.length < 10) {
        setField("tags", [...tags, val]);
        setTagInput("");
      }
    }
  };

  const removeTag = (i) => {
    const t = [...tags];
    t.splice(i, 1);
    setField("tags", t);
  };

  return { tagInput, setTagInput, addTag, removeTag };
};
