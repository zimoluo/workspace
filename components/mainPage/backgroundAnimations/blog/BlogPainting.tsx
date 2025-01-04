"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import blogStyle from "./blog.module.css";

const imageSets = {
  original: ["mountain", "tower", "eunoe"],
};

export default function BlogPainting() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const images = imageSets.original;

    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);

  return selectedImage ? (
    <Image
      src={`./theme/animated-background/blog/painting/${selectedImage}.svg`}
      alt="Blog Painting"
      height={0}
      width={0}
      className={`absolute pointer-events-none ${blogStyle.size}`}
      priority={true}
    />
  ) : null;
}
