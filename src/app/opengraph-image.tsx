import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Branded social-share card, generated at build time. Uses the default
// (system) font on purpose — loading a custom font here can fail the build.
export const alt =
  "Studio Albâtre — Création de sites internet & SEO en Normandie";
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
          padding: "80px",
          background:
            "radial-gradient(1000px 700px at 110% -10%, #0b0f22, #070912)",
          color: "#f2f5ff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6366f1, #22d3ee)",
              fontSize: "38px",
              fontWeight: 700,
              color: "#04121a",
            }}
          >
            SA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "40px", fontWeight: 700 }}>{site.name}</div>
            <div
              style={{
                fontSize: "20px",
                letterSpacing: "0.18em",
                color: "#22d3ee",
              }}
            >
              {site.region.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "68px",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          <span>Des sites web qui attirent</span>
          <span>
            et{" "}
            <span style={{ color: "#22d3ee" }}>convertissent</span> vos clients
          </span>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            color: "#aab2cf",
          }}
        >
          Création de sites internet &amp; SEO ·{" "}
          {site.zones.filter((z) => z !== "À distance").join(" · ")}
        </div>
      </div>
    ),
    { ...size },
  );
}
