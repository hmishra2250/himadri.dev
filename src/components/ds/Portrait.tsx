import Image from "next/image";

/** The original portrait in a 4px frame; its size comes from the context. */
export function Portrait({ alt }: { alt: string }) {
  return (
    <span className="hm-portrait">
      <Image
        src="/images/himadri-portrait.png"
        alt={alt}
        width={460}
        height={460}
        priority
      />
    </span>
  );
}
