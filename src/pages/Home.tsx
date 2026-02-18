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
}

// ============================================
// BACKGROUND COLORS - Edit hex values here
// ============================================
const BACKGROUND_COLORS = [
  "#002d18", // Dark green (default)
  "#401500", // Terra dark
  // "#591111", // Dark burgundy
  "#151530", // Dark navy blue
  "#2c1142", // Dark purple
  "#400834", // Deep dark magenta
  "#1c2833", // Dark slate
  // "#222222", // Dark charcoal
];
// ============================================

// Target 30fps for better performance on older devices
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

const variantParams: Record<Variant, VariantParams> = {
  shorter: {
    speedMultiplier: 1.1,
    minStretchMultiplier: 1 / 3,
    maxStretchMultiplier: 2 / 3,
    colors: ["#63C34A", "#ffffff"],
    spikeChance: 0.0005, // ~few spikes per second
    spikeMaxStretch: 0.77, // 15% taller than 0.67
    spikeSpeedMultiplier: 1.5, // 50% faster during spike
  },
  taller: {
    speedMultiplier: 0.37,
    minStretchMultiplier: 1 / 4,
    maxStretchMultiplier: 1,
    colors: ["#63C34A", "#ffffff"],
    spikeChance: 0,
    spikeMaxStretch: 1,
    spikeSpeedMultiplier: 1,
  },
  free: {
    speedMultiplier: 0.37,
    minStretchMultiplier: 1 / 4,
    maxStretchMultiplier: 1,
    colors: ["#63C34A", "#ffffff"],
    spikeChance: 0,
    spikeMaxStretch: 1,
    spikeSpeedMultiplier: 1,
    greenBaseOffset: 10,
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

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const generateLines = () => {
      const lines: GrassLine[] = [];
      const width = window.innerWidth;
      const lineCount = Math.floor(width / 8);
      const grassColors = ["#63C34A", "#ffffff"];

      for (let i = 0; i < lineCount; i++) {
        const x = 1 + (i / lineCount) * width;
        const strokeWidth = 2 + Math.random() * 0;
        const speed = 0.5 + Math.random() * 1.5;
        const phase = Math.random() * Math.PI * 2;
        const maxStretch = 0.3 + Math.random() * 0.7;
        const color = grassColors[i % grassColors.length];

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

      lineElements.forEach((lineEl, index) => {
        const line = linesRef.current[index];
        if (!line) return;

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
        const maxStretchMult = line.isSpiking
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

        const stretchFactor = (Math.sin(line.phase) + 1) / 2;
        const minStretch = line.maxStretch * params.minStretchMultiplier;
        const maxStretch = line.maxStretch * maxStretchMult;
        const actualStretch =
          minStretch + stretchFactor * (maxStretch - minStretch);
        const topY = bottomY - actualStretch * maxStretchZone;

        // Calculate base offset for green lines in free mode (starts below white lines)
        let actualBottomY = bottomY;
        if (params.greenBaseOffset && line.color === "#63C34A") {
          actualBottomY = bottomY + params.greenBaseOffset;
        }

        // Enforce minimum height constraint
        let finalTopY = topY;
        if (params.minHeight && actualBottomY - topY < params.minHeight) {
          finalTopY = actualBottomY - params.minHeight;
        }

        lineEl.setAttribute("y1", String(actualBottomY));
        lineEl.setAttribute("y2", String(finalTopY));
      });

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
