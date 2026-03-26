import { ImageResponse } from "next/og";

export async function GET() {
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
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-2px",
          }}
        >
          U
        </div>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
