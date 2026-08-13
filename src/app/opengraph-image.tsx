import { ImageResponse } from "next/og";

export const alt = "Benjamin Brown — Founder, Builder, Operator";
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
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>
            BENJAMIN BROWN
          </div>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#fafafa",
              marginTop: 6,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Building in the open, shipping for real.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #1f1f1f",
            paddingTop: 28,
            fontSize: 24,
            color: "#8a8a8a",
          }}
        >
          <div style={{ display: "flex" }}>Founder · Builder · Operator</div>
          <div style={{ display: "flex" }}>benjaminbrown.co</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
