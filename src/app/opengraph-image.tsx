import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "OZA Design - Architecture & Interior Design";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111",
          fontFamily: "serif",
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            width: 60,
            height: 1,
            backgroundColor: "#B8977E",
            marginBottom: 40,
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 140,
            fontWeight: 400,
            color: "#FAFAFA",
            letterSpacing: "0.15em",
            marginBottom: 24,
          }}
        >
          OZA
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            color: "#B8977E",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
          }}
        >
          Architecture & Interior Design
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 14,
            color: "rgba(250, 250, 250, 0.4)",
            letterSpacing: "0.2em",
            marginTop: 32,
          }}
        >
          London · Istanbul
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
