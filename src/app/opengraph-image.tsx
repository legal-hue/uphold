import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Upheld. Your rights, upheld.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a2e1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3D8B5E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Upheld
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "#9BC4A8",
            marginBottom: "40px",
          }}
        >
          Your rights, upheld.
        </p>
        <div
          style={{
            display: "flex",
            gap: "32px",
            fontSize: "18px",
            color: "#6B8F6B",
          }}
        >
          <span>Employment</span>
          <span>|</span>
          <span>Housing</span>
          <span>|</span>
          <span>Contracts</span>
          <span>|</span>
          <span>Creative</span>
        </div>
        <p
          style={{
            fontSize: "16px",
            color: "#4A6B4A",
            marginTop: "40px",
          }}
        >
          Free legal guidance for UK workers, tenants, and creators
        </p>
      </div>
    ),
    { ...size }
  );
}
