"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
};

export default function ImageUploader({ images, onChange }: Props) {
  function handleRemove(url: string) {
    onChange(images.filter((i) => i !== url));
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        {images.map((url) => (
          <div key={url} style={{ position: "relative", width: 100, height: 100 }}>
            <Image src={url} alt="" fill sizes="100px" style={{ objectFit: "cover", borderRadius: 4, border: "1px solid #e2d5b0" }} />
            <button
              type="button"
              onClick={() => handleRemove(url)}
              style={{
                position: "absolute", top: -8, right: -8, width: 22, height: 22,
                borderRadius: "50%", background: "#c0392b", color: "#fff",
                border: "none", cursor: "pointer", fontSize: 12, lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="sam_website_unsigned"
          onSuccess={(result) => {
            const info = result.info as { secure_url: string } | undefined;
            if (info?.secure_url) {
              onChange([...images, info.secure_url]);
            }
          }}
        options={{ multiple: true, maxFiles: 8 }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            style={{
              padding: "10px 20px", fontSize: 12, letterSpacing: "0.1em",
              background: "#f5f0e4", color: "#7a5c2e",
              border: "1px dashed #c9a84c", borderRadius: 4, cursor: "pointer",
            }}
          >
            + TẢI ẢNH LÊN
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}