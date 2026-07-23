import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #232323 0%, #111111 100%)",
          color: "#f7f2e9",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        DBS Aesthetics Clinic & Salon
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
