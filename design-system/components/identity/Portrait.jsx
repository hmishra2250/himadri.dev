import React from "react";
export function Portrait({ src = "assets/himadri-portrait.png", size = 160, alt = "Himadri Mishra" }) {
  return <span className="hm-portrait" style={{ width: "100%", maxWidth: size, aspectRatio: "1 / 1" }}><img src={src} alt={alt} /></span>;
}
