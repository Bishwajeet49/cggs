"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Globe radius ────────────────────────────────────────── */
const R = 2.2;

/**
 * Equirectangular projection: lat/lng → 3-D vector.
 * Matches Three.js SphereGeometry UV layout exactly:
 *   vertex.x = -cos(u·2π) · sin(v·π)
 *   vertex.y =  cos(v·π)
 *   vertex.z =  sin(u·2π) · sin(v·π)
 * where  u = (lng+180)/360  and  v = (90-lat)/180.
 * The critical difference from a naïve formula is the NEGATIVE sign on x.
 */
function ll2v(lat: number, lng: number, r: number): THREE.Vector3 {
  const u     = (lng + 180) / 360;               // 0..1 left→right
  const v     = (90  - lat) / 180;               // 0..1 north→south
  const phi   = u * 2 * Math.PI;                 // azimuthal
  const theta = v * Math.PI;                     // polar (colatitude)
  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.sin(theta),         // x  ← negative!
     r * Math.cos(theta),                         // y
     r * Math.sin(phi) * Math.sin(theta),         // z
  );
}

/* Initial Y-rotation so Chennai (lng≈80°) faces the camera on load.
   Computed as atan2(localX, -localZ) + π for the corrected ll2v formula. */
const INITIAL_Y = 3.3114;

/* Full list of CGGS 2027 participating nations */
const NATIONS = [
  /* host */
  { name: "India",                        lat:  20.59, lng:  78.96, host: true  },
  /* A */
  { name: "Albania",                      lat:  41.15, lng:  20.17, host: false },
  { name: "Algeria",                      lat:  28.03, lng:   1.66, host: false },
  { name: "Angola",                       lat: -11.20, lng:  17.87, host: false },
  { name: "Argentina",                    lat: -38.42, lng: -63.62, host: false },
  { name: "Australia",                    lat: -25.27, lng: 133.77, host: false },
  { name: "Azerbaijan",                   lat:  40.14, lng:  47.58, host: false },
  /* B */
  { name: "Bahamas",                      lat:  25.03, lng: -77.40, host: false },
  { name: "Bahrain",                      lat:  26.00, lng:  50.55, host: false },
  { name: "Bangladesh",                   lat:  23.68, lng:  90.36, host: false },
  { name: "Belgium",                      lat:  50.85, lng:   4.35, host: false },
  { name: "Benin",                        lat:   9.31, lng:   2.32, host: false },
  { name: "Bolivia",                      lat: -16.29, lng: -63.59, host: false },
  { name: "Bosnia and Herzegovina",       lat:  43.92, lng:  17.68, host: false },
  { name: "Brazil",                       lat: -14.24, lng: -51.93, host: false },
  { name: "Brunei",                       lat:   4.54, lng: 114.73, host: false },
  /* C */
  { name: "Cambodia",                     lat:  12.57, lng: 104.99, host: false },
  { name: "Cameroon",                     lat:   3.85, lng:  11.50, host: false },
  { name: "Canada",                       lat:  56.13, lng:-106.35, host: false },
  { name: "Chile",                        lat: -35.68, lng: -71.54, host: false },
  { name: "China",                        lat:  35.86, lng: 104.20, host: false },
  { name: "Colombia",                     lat:   4.57, lng: -74.30, host: false },
  { name: "Comoros",                      lat: -11.70, lng:  43.87, host: false },
  { name: "Cook Islands",                 lat: -21.24, lng:-159.78, host: false },
  { name: "Costa Rica",                   lat:   9.75, lng: -83.75, host: false },
  /* D */
  { name: "Djibouti",                     lat:  11.83, lng:  42.59, host: false },
  /* E */
  { name: "Ecuador",                      lat:  -1.83, lng: -78.18, host: false },
  { name: "Egypt",                        lat:  26.82, lng:  30.80, host: false },
  { name: "El Salvador",                  lat:  13.79, lng: -88.90, host: false },
  /* F */
  { name: "Fiji",                         lat: -17.71, lng: 178.06, host: false },
  { name: "France",                       lat:  46.23, lng:   2.21, host: false },
  /* G */
  { name: "Gabon",                        lat:  -0.80, lng:  11.61, host: false },
  { name: "Georgia",                      lat:  42.31, lng:  43.36, host: false },
  { name: "Germany",                      lat:  51.17, lng:  10.45, host: false },
  { name: "Ghana",                        lat:   7.95, lng:  -1.02, host: false },
  { name: "Greece",                       lat:  39.07, lng:  21.82, host: false },
  { name: "Guatemala",                    lat:  15.78, lng: -90.23, host: false },
  /* H */
  { name: "Honduras",                     lat:  15.20, lng: -86.24, host: false },
  /* I */
  { name: "Indonesia",                    lat:  -0.79, lng: 113.92, host: false },
  { name: "Italy",                        lat:  41.87, lng:  12.57, host: false },
  { name: "Ivory Coast",                  lat:   7.54, lng:  -5.55, host: false },
  /* J */
  { name: "Japan",                        lat:  36.20, lng: 138.25, host: false },
  /* K */
  { name: "Kenya",                        lat:  -0.02, lng:  37.91, host: false },
  /* L */
  { name: "Liberia",                      lat:   6.43, lng:  -9.43, host: false },
  /* M */
  { name: "Madagascar",                   lat: -18.77, lng:  46.87, host: false },
  { name: "Malaysia",                     lat:   4.21, lng: 101.97, host: false },
  { name: "Maldives",                     lat:   3.20, lng:  73.22, host: false },
  { name: "Mauritius",                    lat: -20.35, lng:  57.55, host: false },
  { name: "Mexico",                       lat:  23.63, lng:-102.55, host: false },
  { name: "Morocco",                      lat:  31.79, lng:  -7.09, host: false },
  { name: "Mozambique",                   lat: -18.67, lng:  35.53, host: false },
  /* N */
  { name: "Netherlands",                  lat:  52.13, lng:   5.29, host: false },
  { name: "New Zealand",                  lat: -40.90, lng: 174.88, host: false },
  { name: "Nigeria",                      lat:   9.08, lng:   8.68, host: false },
  /* O */
  { name: "Oman",                         lat:  21.47, lng:  55.97, host: false },
  /* P */
  { name: "Pakistan",                     lat:  30.38, lng:  69.35, host: false },
  { name: "Panama",                       lat:   8.54, lng: -80.78, host: false },
  { name: "Papua New Guinea",             lat:  -6.31, lng: 143.96, host: false },
  { name: "Paraguay",                     lat: -23.44, lng: -58.44, host: false },
  { name: "Peru",                         lat:  -9.19, lng: -75.02, host: false },
  { name: "Philippines",                  lat:  12.88, lng: 121.77, host: false },
  { name: "Poland",                       lat:  51.92, lng:  19.15, host: false },
  { name: "Portugal",                     lat:  39.40, lng:  -8.22, host: false },
  /* Q */
  { name: "Qatar",                        lat:  25.35, lng:  51.18, host: false },
  /* R */
  { name: "Republic of Congo",            lat:  -0.23, lng:  15.83, host: false },
  { name: "Romania",                      lat:  45.94, lng:  24.97, host: false },
  { name: "Russia",                       lat:  61.52, lng: 105.32, host: false },
  /* S */
  { name: "Saint Kitts and Nevis",        lat:  17.36, lng: -62.78, host: false },
  { name: "Saint Vincent",                lat:  12.98, lng: -61.29, host: false },
  { name: "Samoa",                        lat: -13.76, lng:-172.10, host: false },
  { name: "Saudi Arabia",                 lat:  23.89, lng:  45.08, host: false },
  { name: "Senegal",                      lat:  14.50, lng: -14.45, host: false },
  { name: "Seychelles",                   lat:  -4.68, lng:  55.49, host: false },
  { name: "Sierra Leone",                 lat:   8.46, lng: -11.78, host: false },
  { name: "Singapore",                    lat:   1.35, lng: 103.82, host: false },
  { name: "Slovenia",                     lat:  46.15, lng:  14.99, host: false },
  { name: "Somalia",                      lat:   5.15, lng:  46.20, host: false },
  { name: "South Africa",                 lat: -30.56, lng:  22.94, host: false },
  { name: "South Korea",                  lat:  37.56, lng: 126.97, host: false },
  { name: "Spain",                        lat:  40.46, lng:  -3.75, host: false },
  { name: "Sri Lanka",                    lat:   7.87, lng:  80.77, host: false },
  /* T */
  { name: "Tanzania",                     lat:  -6.37, lng:  34.89, host: false },
  { name: "Thailand",                     lat:  15.87, lng: 100.99, host: false },
  { name: "Turkey",                       lat:  38.96, lng:  35.24, host: false },
  { name: "Tuvalu",                       lat:  -7.11, lng: 177.65, host: false },
  /* U */
  { name: "UK",                           lat:  51.50, lng:  -0.12, host: false },
  { name: "USA",                          lat:  37.09, lng: -95.71, host: false },
  { name: "Uruguay",                      lat: -32.52, lng: -55.77, host: false },
  /* V */
  { name: "Vanuatu",                      lat: -15.38, lng: 166.96, host: false },
  { name: "Vietnam",                      lat:  14.06, lng: 108.28, host: false },
  /* Y */
  { name: "Yemen",                        lat:  15.55, lng:  48.52, host: false },
];

/* ─── Procedural Earth texture ────────────────────────────── */
/**
 * Builds a canvas-based Earth texture that renders immediately without
 * any network request.  Used as the instant fallback while the real
 * texture file loads.
 */
function buildProceduralEarth(): THREE.CanvasTexture {
  const W = 1024, H = 512;
  const cvs = document.createElement("canvas");
  cvs.width = W; cvs.height = H;
  const ctx = cvs.getContext("2d")!;

  const px = (lng: number) => ((lng + 180) / 360) * W;
  const py = (lat: number) => ((90  - lat) / 180) * H;

  /** Draw a land patch as an ellipse in lat/lng space */
  function land(lat: number, lng: number, dlat: number, dlng: number, rot = 0, color = "#4a7840") {
    ctx.fillStyle = color;
    ctx.save();
    ctx.translate(px(lng), py(lat));
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, (dlng / 360) * W, (dlat / 180) * H, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* Ocean gradient */
  const og = ctx.createLinearGradient(0, 0, 0, H);
  og.addColorStop(0,   "#082248");
  og.addColorStop(0.5, "#0c3578");
  og.addColorStop(1,   "#082248");
  ctx.fillStyle = og;
  ctx.fillRect(0, 0, W, H);

  /* ── Continents ─────────────────────────────── */
  /* North America */
  land(52, -100, 28, 52, 0.15);
  land(30, -90,  12, 22, 0.20);  // SE USA + gulf
  land(22, -102, 12, 14, 0.00);  // Mexico

  /* South America */
  land(-8, -57, 30, 22, 0.10);

  /* Greenland */
  land(72, -42, 10, 18, 0.30, "#ccdce8");

  /* Europe */
  land(52, 14, 12, 18, 0.00);
  land(66, 18,  8, 24, 0.10);   // Scandinavia

  /* Africa */
  land( 4, 22, 34, 28, 0.05);
  land(-22, 26, 16, 22, 0.00);  // Southern Africa

  /* Middle East + Arabian Peninsula */
  land(27, 43, 12, 20, 0.20, "#a09050");

  /* Russia / N Asia */
  land(60, 85, 18, 80, 0.00);
  land(52, 40, 12, 28, 0.00);

  /* India + S Asia */
  land(22, 80, 20, 20, 0.15);
  land(18, 92, 10, 12, 0.10);

  /* SE Asia */
  land(12, 102, 16, 20, 0.10);

  /* China / East Asia */
  land(36, 108, 20, 28, 0.00);
  land(52, 112, 12, 22, 0.00);

  /* Japan */
  land(36, 136, 8, 3, 0.50);

  /* Australia */
  land(-25, 133, 16, 26, 0.05);

  /* ── Desert overlay ─────────────────────────── */
  land(26,  20, 14, 32, 0.00, "rgba(190,155,80,0.45)"); // Sahara
  land(26,  58, 12, 22, 0.10, "rgba(200,165,85,0.40)"); // Arabian
  land(-26,122, 10, 14, 0.00, "rgba(190,155,80,0.35)"); // AUS interior
  land(44,  86,  8, 28, 0.00, "rgba(175,145,75,0.35)"); // C-Asia steppe

  /* ── Ice caps ───────────────────────────────── */
  // Arctic
  const arcticGrad = ctx.createLinearGradient(0, 0, 0, py(62));
  arcticGrad.addColorStop(0, "#d8eaf8");
  arcticGrad.addColorStop(1, "rgba(216,234,248,0)");
  ctx.fillStyle = arcticGrad;
  ctx.fillRect(0, 0, W, py(62));

  // Antarctic
  const antGrad = ctx.createLinearGradient(0, py(-62), 0, H);
  antGrad.addColorStop(0, "rgba(216,234,248,0)");
  antGrad.addColorStop(1, "#d0e2f4");
  ctx.fillStyle = antGrad;
  ctx.fillRect(0, py(-62), W, H);

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ─── India pulsing marker ────────────────────────────────── */
function IndiaMarker({ pos }: { pos: THREE.Vector3 }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p1 = (t % 2.2) / 2.2;
    const p2 = ((t + 1.1) % 2.2) / 2.2;
    if (r1.current) {
      r1.current.scale.setScalar(1 + p1 * 3.2);
      (r1.current.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - p1);
    }
    if (r2.current) {
      r2.current.scale.setScalar(1 + p2 * 3.2);
      (r2.current.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - p2);
    }
  });

  return (
    <group position={pos}>
      <mesh ref={r1}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshBasicMaterial color="#ffd700" transparent depthWrite={false} />
      </mesh>
      <mesh ref={r2}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshBasicMaterial color="#ffaa00" transparent depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.048, 12, 12]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>
    </group>
  );
}

/* ─── Arc line from nation to India ──────────────────────── */
function Arc({
  fromLocal, toLocal, baseOpacity, groupRef,
}: {
  fromLocal:   THREE.Vector3;
  toLocal:     THREE.Vector3;
  baseOpacity: number;
  groupRef:    React.RefObject<THREE.Group | null>;
}) {
  const matRef = useRef<THREE.LineBasicMaterial | null>(null);

  const lineObj = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(fromLocal, toLocal)
      .normalize()
      .multiplyScalar(R * 1.30);
    const pts = new THREE.QuadraticBezierCurve3(fromLocal, mid, toLocal).getPoints(44);
    const mat = new THREE.LineBasicMaterial({
      color: "#a8dcff",
      transparent: true,
      opacity: baseOpacity,
      depthTest: true,
      linewidth: 1,
    });
    matRef.current = mat;
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
  }, [fromLocal, toLocal, baseOpacity]);

  useFrame(({ clock }) => {
    if (!matRef.current || !groupRef.current) return;
    const a = groupRef.current.rotation.y;
    /* Three.js Y-rotation: worldZ = −sin(a)·x + cos(a)·z */
    const worldZ = -Math.sin(a) * fromLocal.x + Math.cos(a) * fromLocal.z;
    const vis    = Math.max(0, Math.min(1, worldZ * 4)); // fade at horizon
    const pulse  = 0.75 + 0.25 * Math.sin(clock.getElapsedTime() * 0.7);
    matRef.current.opacity = vis * baseOpacity * pulse;
  });

  return <primitive object={lineObj} />;
}

/* ─── Main interactive scene ──────────────────────────────── */
function GlobeScene({
  isInView,
  shouldReset,
}: {
  isInView:    React.RefObject<boolean>;
  shouldReset: React.RefObject<boolean>;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const matRef    = useRef<THREE.MeshPhongMaterial>(null);
  const { gl }    = useThree();

  /* Load textures imperatively so needsUpdate is always set correctly.
     We defer one frame so R3F has committed refs before we touch them. */
  const texInitDone = useRef(false);
  useFrame(() => {
    if (texInitDone.current || !matRef.current) return;
    texInitDone.current = true;

    // Procedural globe shows instantly
    const proc = buildProceduralEarth();
    matRef.current.map = proc;
    matRef.current.needsUpdate = true;

    // Replace with real Earth photo when ready
    new THREE.TextureLoader().load(
      "/textures/earth_daymap.jpg",
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        if (matRef.current) {
          matRef.current.map = t;
          matRef.current.needsUpdate = true;
        }
      },
    );
  });

  /* Drag rotation */
  const isDragging = useRef(false);
  const lastPtr    = useRef({ x: 0, y: 0 });
  const vel        = useRef({ x: 0, y: 0 });
  const rot        = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;
    const start  = (x: number, y: number) => {
      isDragging.current = true;
      lastPtr.current    = { x, y };
      vel.current        = { x: 0, y: 0 };
    };
    const move = (x: number, y: number) => {
      if (!isDragging.current) return;
      const dx = x - lastPtr.current.x;
      const dy = y - lastPtr.current.y;
      rot.current.y += dx * 0.007;
      rot.current.x  = Math.max(-0.5, Math.min(0.5, rot.current.x + dy * 0.005));
      vel.current    = { x: dx * 0.007, y: dy * 0.005 };
      lastPtr.current = { x, y };
    };
    const end = () => { isDragging.current = false; };

    const onMD  = (e: MouseEvent)  => start(e.clientX, e.clientY);
    const onMM  = (e: MouseEvent)  => move(e.clientX, e.clientY);
    const onTS  = (e: TouchEvent)  => { e.preventDefault(); start(e.touches[0].clientX, e.touches[0].clientY); };
    const onTM  = (e: TouchEvent)  => { e.preventDefault(); move(e.touches[0].clientX, e.touches[0].clientY); };

    canvas.addEventListener("mousedown",  onMD);
    window.addEventListener("mousemove",  onMM);
    window.addEventListener("mouseup",    end);
    canvas.addEventListener("touchstart", onTS, { passive: false });
    canvas.addEventListener("touchmove",  onTM, { passive: false });
    canvas.addEventListener("touchend",   end);
    canvas.style.cursor = "grab";

    return () => {
      canvas.removeEventListener("mousedown",  onMD);
      window.removeEventListener("mousemove",  onMM);
      window.removeEventListener("mouseup",    end);
      canvas.removeEventListener("touchstart", onTS);
      canvas.removeEventListener("touchmove",  onTM);
      canvas.removeEventListener("touchend",   end);
      canvas.style.cursor = "";
    };
  }, [gl]);

  useFrame(() => {
    if (!groupRef.current) return;

    if (shouldReset.current) {
      /* Smoothly lerp back to the Chennai-facing start position */
      rot.current.y *= 0.88;
      rot.current.x *= 0.88;
      vel.current    = { x: 0, y: 0 };
      if (Math.abs(rot.current.y) < 0.004 && Math.abs(rot.current.x) < 0.004) {
        rot.current.y       = 0;
        rot.current.x       = 0;
        shouldReset.current = false;   // reset done — resume auto-rotate
      }
    } else if (isInView.current && !isDragging.current) {
      /* Normal auto-rotate only while the section is visible */
      rot.current.y += vel.current.x;
      rot.current.x  = Math.max(-0.5, Math.min(0.5, rot.current.x + vel.current.y));
      vel.current.x *= 0.93;
      vel.current.y *= 0.93;
      rot.current.y += 0.0022;
    }
    /* When !isInView and !shouldReset → frozen in place (saves GPU) */

    groupRef.current.rotation.y = INITIAL_Y + rot.current.y;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, rot.current.x, 0.08,
    );
  });

  /* Chennai is the host city — marker, arcs, and badge all use the exact same point */
  const hostVec    = useMemo(() => ll2v(13.08, 80.27, R + 0.055), []); // on-surface
  const badgeVec   = useMemo(() => ll2v(13.08, 80.27, R + 0.15),  []); // slightly above
  const nations    = useMemo(() => NATIONS.map((n) => ({ ...n, vec: ll2v(n.lat, n.lng, R + 0.055) })), []);

  return (
    <group ref={groupRef}>

      {/* ── Earth sphere ── */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[R, 80, 80]} />
        <meshPhongMaterial
          ref={matRef}
          specular={new THREE.Color(0x111111)}
          shininess={4}
          emissive={new THREE.Color(0x000000)}
        />
      </mesh>

      {/* ── Atmosphere — very thin rim glow only ── */}
      <mesh>
        <sphereGeometry args={[R * 1.018, 40, 40]} />
        <meshBasicMaterial
          color="#88ccff"
          transparent
          opacity={0.012}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Country dots ── */}
      {nations.filter((n) => !n.host).map((n) => (
        <mesh key={n.name} position={n.vec}>
          <sphereGeometry args={[0.036, 10, 10]} />
          <meshStandardMaterial
            color="#70d4ff"
            emissive="#30a8e8"
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}

      {/* ── India gold pulse ── */}
      <IndiaMarker pos={hostVec} />

      {/* ── Chennai badge in 3-D space ── */}
      <Html
        position={badgeVec}
        occlude={[sphereRef as React.RefObject<THREE.Object3D>]}
        center
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#C5A028,#E0C048)",
            color: "#06111E",
            padding: "4px 11px 4px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 800,
            whiteSpace: "nowrap",
            letterSpacing: "0.03em",
            boxShadow: "0 2px 12px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            position: "relative",
            transform: "translateY(-26px)",
          }}
        >
          🇮🇳 Chennai, India — Host
          <span style={{
            position: "absolute",
            bottom: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "6px solid #C5A028",
          }} />
        </div>
      </Html>

      {/* ── Maritime arc routes ── */}
      {nations.filter((n) => !n.host).map((n, i) => (
        <Arc
          key={n.name}
          fromLocal={n.vec}
          toLocal={hostVec}
          baseOpacity={0.42 + (i % 5) * 0.07}
          groupRef={groupRef}
        />
      ))}
    </group>
  );
}

/* ─── Canvas export ───────────────────────────────────────── */
export default function GlobeCanvas() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const isInViewRef   = useRef<boolean>(false);
  const shouldResetRef = useRef<boolean>(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const entering = entry.isIntersecting;
        /* Every time the section enters the viewport (from top or bottom)
           trigger a smooth roll-back to the Chennai-facing start position. */
        if (entering && !isInViewRef.current) {
          shouldResetRef.current = true;
        }
        isInViewRef.current = entering;
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0.1, 5.2], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        {/* Broad soft ambient — warm white so textures show true colour */}
        <ambientLight intensity={0.72} color="#ffffff" />

        {/* Primary sun — bright, front-centre like Google Earth */}
        <directionalLight position={[1, 1.5, 8]} intensity={1.9} color="#fff8f0" />

        {/* Soft fill from upper-left to reduce harsh shadow on edges */}
        <directionalLight position={[-5, 3, 3]} intensity={0.45} color="#f0f8ff" />

        <GlobeScene isInView={isInViewRef} shouldReset={shouldResetRef} />
      </Canvas>
    </div>
  );
}
