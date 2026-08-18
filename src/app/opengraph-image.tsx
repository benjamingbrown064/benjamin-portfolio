import { ImageResponse } from "next/og";

export const alt = "Benjamin Brown — look at the flag";
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
          background: "#f4f0e6",
          color: "#171513",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M9 4.5v23" stroke="#171513" strokeWidth="1.5" />
            <path d="M6.5 27.5h5" stroke="#171513" strokeWidth="1.5" />
            <path d="M9 5.5h13.5l-3.4 4.4 3.4 4.4H9" stroke="#171513" strokeWidth="1.5" fill="#b42318" />
          </svg>
          <div style={{ fontSize: 26, letterSpacing: "-0.02em" }}>Benjamin Brown</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 44,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            maxWidth: 920,
          }}
        >
          The why is the win. The how is the win. The result is the win.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #d8d2c6",
            paddingTop: 28,
            fontSize: 22,
            color: "#6f6a62",
          }}
        >
          <div style={{ display: "flex" }}>Costa Mesa</div>
          <div style={{ display: "flex" }}>benjaminbrown.co</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
