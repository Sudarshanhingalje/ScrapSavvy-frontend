import { useState } from "react";

export const useImageUpload = (images, setField) => {
  const [dragging, setDragging] = useState(false);

  const addImages = (files) => {
    const remaining = 5 - images.length;
    const toAdd = Array.from(files).slice(0, remaining);
    const previews = toAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setField("images", [...images, ...previews]);
  };

  const removeImage = (i) => {
    const imgs = [...images];
    imgs.splice(i, 1);
    setField("images", imgs);
  };

  return { dragging, setDragging, addImages, removeImage };
};
