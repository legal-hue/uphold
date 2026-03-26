import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #4A9E6E 0%, #2A6242 100%)",
          borderRadius: "36px",
        }}
      >
        {/* Scales of justice */}
        <svg
          width="44"
          height="32"
          viewBox="0 0 44 32"
          fill="none"
          style={{ marginBottom: "-2px" }}
        >
          {/* Center beam */}
          <rect x="20" y="0" width="4" height="8" rx="2" fill="white" />
          {/* Horizontal bar */}
          <rect x="4" y="6" width="36" height="3" rx="1.5" fill="white" />
          {/* Left chain */}
          <rect x="7" y="9" width="2" height="8" fill="white" />
          {/* Right chain */}
          <rect x="35" y="9" width="2" height="8" fill="white" />
          {/* Left dish */}
          <path d="M0 19 Q8 28 16 19" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Right dish */}
          <path d="M28 19 Q36 28 44 19" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          U
        </div>
      </div>
    ),
    { ...size }
  );
}
