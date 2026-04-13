import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = "Benjamin Brown — One Beyond";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#666666",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          ONE BEYOND.
        </div>

        <div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Benjamin Brown
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#666666",
              fontStyle: "italic",
            }}
          >
            Founder. Builder. Operator.
          </div>
        </div>

        <div
          style={{
            fontSize: 14,
            color: "#333333",
            letterSpacing: "0.08em",
          }}
        >
          {SITE.url}
        </div>
      </div>
    ),
    { ...size }
  );
}
