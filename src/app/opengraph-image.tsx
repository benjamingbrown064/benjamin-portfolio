import { ImageResponse } from "next/og";

export const alt = "Benjamin Brown — Costa Mesa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#8fb9d6",
          color: "#1b1c1e",
          padding: "48px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>Benjamin Brown</div>
          <div style={{ display: "flex" }}>Costa Mesa</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderRadius: 16,
            padding: "40px 44px",
            boxShadow: "0 18px 40px rgba(30,40,50,0.18)",
            fontSize: 36,
            lineHeight: 1.25,
            maxWidth: 860,
          }}
        >
          No one tees off without looking at the flag. The why is the win. The how is the win. The result is the win.
        </div>
      </div>
    ),
    { ...size },
  );
}
