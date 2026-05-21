import { ImageResponse } from "next/og";
import { getPublicProfileByUsername } from "@/lib/data/records";
import { getOgFonts } from "@/lib/og/fonts";

export const runtime = "nodejs";
export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const payload = await getPublicProfileByUsername(username);
  const fonts = getOgFonts();

  if (!payload) {
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
          <span style={{ color: "#4a4945", fontSize: 28 }}>
            Profile not found
          </span>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  const { profile, stats } = payload;

  const elevationText = `+${stats.totalElevationGainFt.toLocaleString()} ft`;
  const distanceText = `${stats.totalDistanceMiles.toFixed(1)} mi`;
  const coverageText = `${stats.statesCovered.length} states`;

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
        {/* Amber radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, #c8a96a18 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Summit-green glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, #4a7a5c14 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 72px",
            width: 1200,
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

          {/* Middle: main text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#4a4945",
                marginBottom: 16,
              }}
            >
              Adventure profile
            </span>
            <span
              style={{
                fontFamily: "Playfair Display",
                fontWeight: 400,
                fontSize: 80,
                color: "#ece8df",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {profile.displayName}
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 20,
                color: "#4a7a5c",
                marginTop: 12,
              }}
            >
              @{profile.username}
            </span>
            {profile.bio && (
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 18,
                  color: "#8a8880",
                  marginTop: 12,
                  maxWidth: 680,
                  lineHeight: 1.5,
                }}
              >
                {profile.bio.length > 120
                  ? profile.bio.slice(0, 120) + "…"
                  : profile.bio}
              </span>
            )}
          </div>

          {/* Bottom: stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
              {/* Big peaks climbed */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "18px 28px",
                  background: "#141414",
                  border: "1px solid #1c1c1c",
                  borderRadius: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "Playfair Display",
                    fontWeight: 400,
                    fontSize: 48,
                    color: "#ece8df",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stats.totalPeaksClimbed}
                </span>
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: 13,
                    color: "#4a4945",
                    marginTop: 6,
                  }}
                >
                  Peaks climbed
                </span>
              </div>

              {/* Other stats */}
              {[
                { value: elevationText, label: "Elevation gain" },
                { value: distanceText, label: "Distance" },
                { value: coverageText, label: "Coverage" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "18px 24px",
                    background: "#141414",
                    border: "1px solid #1c1c1c",
                    borderRadius: 20,
                    minWidth: 140,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: 24,
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
                      marginTop: 6,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}

              {/* Highest summit callout */}
              {stats.highestSummit && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "18px 24px",
                    background: "#0f140e",
                    border: "1px solid #2d4a38",
                    borderRadius: 20,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#4a7a5c",
                      marginBottom: 8,
                    }}
                  >
                    Featured summit
                  </span>
                  <span
                    style={{
                      fontFamily: "Playfair Display",
                      fontWeight: 400,
                      fontSize: 24,
                      color: "#ece8df",
                      lineHeight: 1.2,
                    }}
                  >
                    {stats.highestSummit.name}
                  </span>
                </div>
              )}
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
