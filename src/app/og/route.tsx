import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px", background: "#f7f5ef", color: "#17324d", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "76px", height: "76px", borderRadius: "22px", background: "#1976a8", color: "white", fontSize: "48px", fontWeight: 700 }}>M</div>
          <div style={{ display: "flex", fontSize: "58px", fontWeight: 700 }}>MediaKit</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "flex", fontSize: "55px", fontWeight: 700 }}>Image &amp; Video</div>
          <div style={{ display: "flex", fontSize: "55px", fontWeight: 700 }}>Converter &amp; Compressor</div>
          <div style={{ display: "flex", fontSize: "27px", color: "#1976a8" }}>HEIC to JPG · WebP to PNG · MOV to MP4</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "24px" }}>
          <span>Free · Local processing · No file uploads</span>
          <span>mediakit.upupdays.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
