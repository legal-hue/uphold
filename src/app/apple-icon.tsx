import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3D8B5E 0%, #2A6242 100%)",
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-2px",
          }}
        >
          U
        </div>
      </div>
    ),
    { ...size }
  );
}
