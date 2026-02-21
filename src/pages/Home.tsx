import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import relvaFullLogo from "../assets/logos/relva-app-symbol-woodmark.svg";
import relvaWordmark from "../assets/logos/relva-app-woodmark.svg";
import relvaInstitutoText from "../assets/logos/relva-app-text.svg";

interface GrassLine {
  x: number;
  strokeWidth: number;
  speed: number;
  phase: number;
  maxStretch: number;
  color: string;
  isSpiking: boolean;
  spikeStartPhase: number;
}

const variants = ["shorter", "taller", "free"] as const;
type Variant = (typeof variants)[number];

interface VariantParams {
  speedMultiplier: number;
  minStretchMultiplier: number;
  maxStretchMultiplier: number;
  colors: string[];
  spikeChance: number;
  spikeMaxStretch: number;
  spikeSpeedMultiplier: number;
  greenDownwardStretch?: number;
  greenBaseOffset?: number;
  minHeight?: number;
  minLineAmplitude?: number;
  waveNumWaves?: number;
  waveSpeed?: number;
  waveSecondarySpeedRatio?: number;
  waveGreenOffset?: number;
}

// ============================================
// BACKGROUND COLORS - Edit hex values here
// ============================================
const BACKGROUND_COLORS = [
  "#002d18", // Dark green (default)
  "#151530", // Dark navy blue
  "#401500", // Terra dark
  "#2c1142", // Dark purple
  "#400834", // Deep dark magenta
  "#1d252c", // Dark slate
];

// Accent color for the non-white lines, paired to each background
const ACCENT_COLORS: Record<string, string> = {
  "#002d18": "#63C34A", // dark green → green
  "#151530": "#0088ff", // dark navy → blue
  "#401500": "#FF8000", // terra dark → orange
  "#2c1142": "#9947e2", // dark purple → green
  "#400834": "#cc3d88", // deep magenta → green
  "#1d252c": "#008888", // dark slate → green
};
// ============================================

// Target 24fps for better performance on older devices
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

const variantParams: Record<Variant, VariantParams> = {
  shorter: {
    speedMultiplier: 0.5,
    minStretchMultiplier: 1 / 3,
    maxStretchMultiplier: 2 / 3,
    colors: ["#63C34A", "#ffffff"],
    spikeChance: 0.0005, // ~few spikes per second
    spikeMaxStretch: 0.77, // 15% taller than 0.67
    spikeSpeedMultiplier: 1.5, // 50% faster during spike
  },
  taller: {
    speedMultiplier: 0.37,
    minStretchMultiplier: 1 / 3,
    maxStretchMultiplier: 1,
    minLineAmplitude: 3 / 4,
    colors: ["#63C34A", "#ffffff"],
    spikeChance: 0,
    spikeMaxStretch: 1,
    spikeSpeedMultiplier: 1,
  },
  // wave variant — lines form a traveling sine wave across the screen
  free: {
    speedMultiplier: 1,
    minStretchMultiplier: 1 / 3,
    maxStretchMultiplier: 2 / 3,
    colors: ["#63C34A", "#ffffff"],
    spikeChance: 0,
    spikeMaxStretch: 1,
    spikeSpeedMultiplier: 1,
    waveNumWaves: 2,
    waveSpeed: 0.02,
    waveSecondarySpeedRatio: 0.75,
    waveGreenOffset: Math.PI / 6,
  },
};

function Home() {
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<GrassLine[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const navigate = useNavigate();
  const [variantIndex, setVariantIndex] = useState(0);
  const variantRef = useRef(variantIndex);
  const [bgColorIndex, setBgColorIndex] = useState(0);
  const accentColorRef = useRef<string>("#63C34A");
  const waveTimeRef = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const generateLines = () => {
      const lines: GrassLine[] = [];
      const width = window.innerWidth;
      const lineCount = Math.floor(width / 8);
      const grassColors = [accentColorRef.current, "#ffffff"];

      for (let i = 0; i < lineCount; i++) {
        const x = 1 + (i / lineCount) * width;
        const color = grassColors[i % grassColors.length];
        const strokeWidth = color !== "#ffffff" ? 2.75 : 2;
        const speed = 0.5 + Math.random() * 1.5;
        const phase = Math.random() * Math.PI * 2;
        const maxStretch = 0.3 + Math.random() * 0.7;

        lines.push({
          x,
          strokeWidth,
          speed,
          phase,
          maxStretch,
          color,
          isSpiking: false,
          spikeStartPhase: 0,
        });
      }
      return lines;
    };

    linesRef.current = generateLines();

    const createLineElements = () => {
      svg.innerHTML = "";
      linesRef.current.forEach((line, index) => {
        const lineEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        lineEl.setAttribute("x1", String(line.x));
        lineEl.setAttribute("x2", String(line.x));
        lineEl.setAttribute("stroke", line.color);
        lineEl.setAttribute("stroke-width", String(line.strokeWidth));
        lineEl.setAttribute("stroke-linecap", "round");
        lineEl.setAttribute("opacity", String(1 + Math.random() * 0));
        lineEl.setAttribute("data-index", String(index));
        svg.appendChild(lineEl);
      });
    };

    createLineElements();

    const animate = (currentTime: number) => {
      // Throttle to target FPS
      const elapsed = currentTime - lastFrameTimeRef.current;

      if (elapsed < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTimeRef.current = currentTime - (elapsed % FRAME_INTERVAL);

      const lineElements = svg.querySelectorAll("line");
      const canvasHeight = window.innerHeight;
      const bottomY = canvasHeight * (2 / 3);
      const maxStretchZone = canvasHeight / 3;

      // Get current variant params
      const currentVariant = variants[variantRef.current];
      const params = variantParams[currentVariant];

      const totalLines = linesRef.current.length;

      lineElements.forEach((lineEl, index) => {
        const line = linesRef.current[index];
        if (!line) return;

        let stretchFactor: number;
        let effectiveMaxStretchMult: number;

        if (currentVariant === "free") {
          // Wave animation: all lines form a single traveling sine wave
          const numWaves = params.waveNumWaves ?? 2;
          const k = (2 * Math.PI * numWaves) / totalLines;
          // Green and white lines travel at slightly different speeds
          const baseSpeed = params.waveSpeed ?? 0.02;
          const speed =
            line.color !== "#ffffff"
              ? baseSpeed
              : baseSpeed * (params.waveSecondarySpeedRatio ?? 0.85);
          const waveOffset = waveTimeRef.current * speed;
          // Non-white (accent) lines are slightly ahead in phase for a subtle layered look
          const colorPhaseOffset =
            line.color !== "#ffffff"
              ? (params.waveGreenOffset ?? Math.PI / 6)
              : 0;
          stretchFactor =
            (Math.sin(index * k - waveOffset + colorPhaseOffset) + 1) / 2;
          const isMobile = window.innerWidth < 768;
          effectiveMaxStretchMult = isMobile
            ? 1 / 2
            : params.maxStretchMultiplier;
        } else {
          // Check if spike should start (only when line is near its lowest point)
          const currentStretch = (Math.sin(line.phase) + 1) / 2;
          if (
            !line.isSpiking &&
            params.spikeChance > 0 &&
            currentStretch < 0.1 &&
            Math.random() < params.spikeChance
          ) {
            line.isSpiking = true;
            line.phase = -Math.PI / 2; // Reset to bottom so surge grows upward
            line.spikeStartPhase = line.phase;
          }

          // Use spike or normal multipliers
          const speedMult = line.isSpiking
            ? params.spikeSpeedMultiplier
            : params.speedMultiplier;
          effectiveMaxStretchMult = line.isSpiking
            ? params.spikeMaxStretch
            : params.maxStretchMultiplier;

          // Adjust phase increment to compensate for lower frame rate
          // Original was 0.015 at 60fps, so multiply by 2 for 30fps
          line.phase += line.speed * 0.03 * speedMult;

          // End spike after one full cycle (2*PI)
          if (
            line.isSpiking &&
            line.phase - line.spikeStartPhase >= Math.PI * 2
          ) {
            line.isSpiking = false;
          }

          stretchFactor = (Math.sin(line.phase) + 1) / 2;
        }

        // Wave variant uses uniform amplitude; other variants use per-line random maxStretch
        const lineAmplitude =
          currentVariant === "free"
            ? line.color !== "#ffffff"
              ? 0.8
              : 0.8
            : Math.max(line.maxStretch, params.minLineAmplitude ?? 0);
        const minStretch = lineAmplitude * params.minStretchMultiplier;
        const maxStretch = lineAmplitude * effectiveMaxStretchMult;
        const actualStretch =
          minStretch + stretchFactor * (maxStretch - minStretch);
        const topY = bottomY - actualStretch * maxStretchZone;

        // Enforce minimum height constraint
        let finalTopY = topY;
        if (params.minHeight && bottomY - topY < params.minHeight) {
          finalTopY = bottomY - params.minHeight;
        }

        lineEl.setAttribute("y1", String(bottomY));
        lineEl.setAttribute("y2", String(finalTopY));
      });

      // Advance wave clock every frame (used by "free" wave variant)
      waveTimeRef.current += 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      linesRef.current = generateLines();
      createLineElements();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Swap accent color when background changes
  useEffect(() => {
    const newAccent =
      ACCENT_COLORS[BACKGROUND_COLORS[bgColorIndex]] ?? "#63C34A";
    const oldAccent = accentColorRef.current;
    accentColorRef.current = newAccent;

    // Patch line data so resize re-generates with correct color
    linesRef.current.forEach((line) => {
      if (line.color === oldAccent) line.color = newAccent;
    });

    // Update SVG stroke attributes directly
    const svg = svgRef.current;
    if (!svg) return;
    svg.querySelectorAll("line").forEach((el, i) => {
      const line = linesRef.current[i];
      if (line) el.setAttribute("stroke", line.color);
    });
  }, [bgColorIndex]);

  const handleLogoClick = () => {
    navigate("/about");
  };

  const handleAnimationClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Exclude bottom-right corner area where the woodmark is (for bg color cycling)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bottomRightPadding = 150; // Area to exclude from animation click

    if (
      x > rect.width - bottomRightPadding &&
      y > rect.height - bottomRightPadding
    ) {
      return; // Ignore clicks in the bottom-right corner
    }

    setVariantIndex((prev) => (prev + 1) % variants.length);
  };

  const handleBackgroundToggle = () => {
    setBgColorIndex((prev) => (prev + 1) % BACKGROUND_COLORS.length);
  };

  // Keep ref in sync with state for use in animation loop
  useEffect(() => {
    variantRef.current = variantIndex;
  }, [variantIndex]);

  return (
    <div
      className="grass-container"
      style={{ backgroundColor: BACKGROUND_COLORS[bgColorIndex] }}
    >
      <img
        src={relvaFullLogo}
        alt="Relva"
        className="logo-top-center"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      />

      <img
        src={relvaWordmark}
        alt="Relva"
        className="logo-bottom-left"
        onClick={handleBackgroundToggle}
        style={{ cursor: "pointer" }}
      />

      <img
        src={relvaInstitutoText}
        alt="Instituto Relva de Ciencias Ambientais e Tecnologia"
        className="logo-bottom-right"
      />

      <div
        style={{
          paddingLeft: 2,
          marginLeft: 2,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <svg
          ref={svgRef}
          className="grass-svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          onClick={handleAnimationClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default Home;
