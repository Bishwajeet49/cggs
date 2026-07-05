"use client";

import { forwardRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import type { RegisteredDelegate } from "@/types/registration";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  head_of_delegation: { bg: "#C9A84C", text: "#0D1B3E", label: "HEAD OF DELEGATION" },
  official_delegate: { bg: "#0D1B3E", text: "#FFFFFF", label: "OFFICIAL DELEGATE" },
  observer: { bg: "#0D7377", text: "#FFFFFF", label: "OBSERVER" },
  media_representative: { bg: "#3D4A5C", text: "#FFFFFF", label: "MEDIA REPRESENTATIVE" },
};

interface DelegateIDCardProps {
  delegate: RegisteredDelegate;
}

const DelegateIDCard = forwardRef<HTMLDivElement, DelegateIDCardProps>(({ delegate }, ref) => {
  const { formData, delegateId, registrationNumber, status } = delegate;
  const { personal, organization } = formData;
  const category = formData.category ?? "official_delegate";
  const catStyle = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.official_delegate;

  const qrPayload = JSON.stringify({
    delegateId,
    registrationNumber,
    name: `${personal.firstName} ${personal.lastName}`,
    category,
    country: personal.nationality || organization.country,
    organization: organization.organizationName,
    status: "PENDING_VERIFICATION",
    summit: "CGGS 2027",
  });

  const fullName = `${personal.firstName} ${personal.lastName}`.trim();

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth: "340px",
        boxSizing: "border-box",
        background: "linear-gradient(160deg, #0D1B3E 0%, #1a2f5e 50%, #0D1B3E 100%)",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        boxShadow: "0 20px 60px rgba(13,27,62,0.4)",
      }}
    >
      {/* Decorative corner lines */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.04) 40px, rgba(201,168,76,0.04) 41px)",
        pointerEvents: "none",
      }} />

      {/* Top gold bar */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #C9A84C, #E8C97A, #C9A84C)" }} />

      {/* Header */}
      <div style={{ padding: "14px 16px 10px", textAlign: "center" }}>
        {/* Logos row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <img
            src="/logos/Indian-navy-logo.png"
            alt="Indian Coast Guard"
            crossOrigin="anonymous"
            style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0 }}
          />
          <img
            src="/logos/5h_cggs_summit_logo.png"
            alt="CGGS 2027"
            crossOrigin="anonymous"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
          <img
            src="/logos/Ministry-of-defence-logo.png"
            alt="Ministry of Defence"
            crossOrigin="anonymous"
            style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0 }}
          />
        </div>

        <p style={{ fontSize: "8px", letterSpacing: "0.18em", color: "#C9A84C", textTransform: "uppercase", fontWeight: 600, margin: 0 }}>
          5th Coast Guard Global Summit
        </p>
        <p style={{ fontSize: "7px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", margin: "2px 0 0" }}>
          Chennai, India · February 2027
        </p>
      </div>

      {/* Gold divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 16px" }} />

      {/* Category stripe */}
      <div style={{
        background: catStyle.bg,
        marginTop: "12px",
        width: "100%",
        height: "28px",
        display: "table",
      }}>
        <div style={{
          display: "table-cell",
          height: "28px",
          verticalAlign: "middle",
          textAlign: "center",
        }}>
          <span style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            color: catStyle.text,
            fontWeight: 700,
            textTransform: "uppercase",
          }}>
            {catStyle.label}
          </span>
        </div>
      </div>

      {/* Photo + info */}
      <div style={{ padding: "14px 16px", display: "flex", gap: "12px", alignItems: "center" }}>
        {/* Photo */}
        <div style={{
          width: "80px", height: "95px", borderRadius: "6px",
          border: "2px solid #C9A84C",
          overflow: "hidden", background: "rgba(255,255,255,0.1)",
          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {personal.profilePhotoUrl ? (
            <img src={personal.profilePhotoUrl} alt={fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "32px", opacity: 0.5 }}>👤</span>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.2, letterSpacing: "0.01em" }}>
            {fullName || "Delegate Name"}
          </p>
          <p style={{ fontSize: "11px", color: "#C9A84C", margin: "4px 0", fontWeight: 500 }}>
            {organization.rankDesignation || "Designation"}
          </p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.4 }}>
            {organization.organizationName || "Organization"}
          </p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", margin: "2px 0 0" }}>
            {personal.nationality || organization.country || "Country"}
          </p>

          {/* Delegate ID */}
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontSize: "7px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", margin: "0 0 2px", textTransform: "uppercase" }}>
              Delegate ID
            </p>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#C9A84C", margin: 0, letterSpacing: "0.05em", fontFamily: "monospace" }}>
              {delegateId}
            </p>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 16px" }} />

      {/* Bottom: QR + registration info */}
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ background: "white", padding: "6px", borderRadius: "6px", flexShrink: 0 }}>
          <QRCodeCanvas
            value={qrPayload}
            size={80}
            level="M"
            includeMargin={false}
          />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <p style={{ fontSize: "7px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", margin: "0 0 2px", textTransform: "uppercase" }}>
              Registration No.
            </p>
            <p style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: 0, fontFamily: "monospace", letterSpacing: "0.05em" }}>
              {registrationNumber}
            </p>
          </div>
          <div style={{
            display: "table",
            height: "22px",
            padding: "0 10px",
            borderRadius: "100px",
            background: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.3)",
          }}>
            <div style={{
              display: "table-cell",
              height: "22px",
              verticalAlign: "middle",
              whiteSpace: "nowrap",
            }}>
              <span style={{
                display: "inline-block",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#C9A84C",
                verticalAlign: "middle",
                marginRight: "5px",
              }} />
              <span style={{
                fontSize: "8px",
                color: "#C9A84C",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                verticalAlign: "middle",
              }}>
                {status === "pending_verification" ? "Pending Verification" : status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold bar */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #C9A84C, #E8C97A, #C9A84C)" }} />
    </div>
  );
});

DelegateIDCard.displayName = "DelegateIDCard";
export default DelegateIDCard;
