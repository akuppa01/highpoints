import { ImageResponse } from "next/og";
import { getPublishedRecord } from "@/lib/data/records";
import { getOgFonts } from "@/lib/og/fonts";

export const runtime = "nodejs";
export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function fmt(n: number | null | undefined, unit: string, decimals = 0) {
  if (n == null) return "—";
  return `${decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString()} ${unit}`;
}

export default async function Image({
  params,
}: {
  params: { username: string; slug: string };
}) {
  const { username, slug } = params;
  const record = await getPublishedRecord(username, slug);

  const fonts = getOgFonts();

  if (!record) {
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            background: "#080808",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter",
          }}
        >
          <span style={{ color: "#4a4945", fontSize: 28 }}>Climb not found</span>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  const heroImage =
    record.media.find((m) => m.isHighlight)?.mediaUrl ?? record.heroPhotoUrl;

  const distanceText = fmt(record.distanceMiles, "mi", 1);
  const gainText =
    record.elevationGainFt != null
      ? `+${Math.round(record.elevationGainFt).toLocaleString()} ft`
      : "—";
  const durationText = (() => {
    const d = record.durationMinutes;
    if (d == null) return "—";
    const h = Math.floor(d / 60);
    const m = d % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  })();

  const location =
    record.locationLabel ||
    [record.state, record.country].filter(Boolean).join(", ");

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#080808",
          display: "flex",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Right panel — hero image or gradient */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 520,
            height: 630,
            display: "flex",
          }}
        >
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #0d1a12 0%, #080808 60%, #111008 100%)",
                display: "flex",
              }}
            />
          )}
          {/* Gradient overlay blending into left panel */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #080808 0%, #08080890 30%, transparent 60%)",
              display: "flex",
            }}
          />
        </div>

        {/* Subtle summit-green radial glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, #4a7a5c22 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left content panel */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 60px",
            width: 720,
            height: 630,
          }}
        >
          {/* Top: branding */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4a7a5c",
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4a7a5c",
              }}
            >
              Summit
            </span>
          </div>

          {/* Middle: main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#4a4945",
                marginBottom: 14,
              }}
            >
              Published climb
            </span>
            <span
              style={{
                fontFamily: "Playfair Display",
                fontWeight: 400,
                fontSize: record.peakName.length > 20 ? 58 : 72,
                color: "#ece8df",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {record.peakName}
            </span>
            {location && (
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 20,
                  color: "#8a8880",
                  marginTop: 14,
                }}
              >
                {location}
              </span>
            )}
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 16,
                color: "#4a7a5c",
                marginTop: 10,
              }}
            >
              @{username}
            </span>
          </div>

          {/* Bottom: stats + footer */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Stats row */}
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { value: distanceText, label: "Distance" },
                { value: gainText, label: "Gain" },
                { value: durationText, label: "Time" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "14px 20px",
                    background: "#141414",
                    border: "1px solid #1c1c1c",
                    borderRadius: 16,
                    minWidth: 120,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: 22,
                      color: "#ece8df",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: 13,
                      color: "#4a4945",
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#2d2d2d",
              }}
            >
              Tracked with Highpoints
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
