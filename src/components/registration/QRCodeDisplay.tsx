"use client";

import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeDisplayProps {
  delegateId: string;
  registrationNumber: string;
  name: string;
  category: string;
  country: string;
  organization: string;
  size?: number;
  className?: string;
}

export default function QRCodeDisplay({
  delegateId,
  registrationNumber,
  name,
  category,
  country,
  organization,
  size = 180,
  className = "",
}: QRCodeDisplayProps) {
  const qrPayload = JSON.stringify({
    delegateId,
    registrationNumber,
    name,
    category,
    country,
    organization,
    status: "PENDING_VERIFICATION",
    summit: "CGGS 2027",
    venue: "Chennai, India",
  });

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
        <QRCodeCanvas
          value={qrPayload}
          size={size}
          level="M"
          includeMargin={false}
          imageSettings={{
            src: "/logos/5h_cggs_summit_logo.png",
            height: Math.round(size * 0.18),
            width: Math.round(size * 0.18),
            excavate: true,
          }}
        />
      </div>
      <p className="text-xs text-slate/60 text-center font-mono">{delegateId}</p>
    </div>
  );
}
