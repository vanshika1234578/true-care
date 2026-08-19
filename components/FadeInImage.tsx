"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

/**
 * Thin wrapper around next/image that fades the image in once it's actually
 * loaded, instead of it popping in abruptly. Keeps layout stable (no shift) —
 * this only affects opacity, never dimensions.
 */
export default function FadeInImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        props.onLoad?.(e);
      }}
      className={`${props.className ?? ""} transition-[opacity,transform] duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
