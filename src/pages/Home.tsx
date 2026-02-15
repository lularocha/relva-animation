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
}

const variants = ["shorter", "taller", "free"] as const;
type Variant = (typeof variants)[number];

const variantParams: Record<
  Variant,
  { speedMultiplier: number; minStretchMultiplier: number; maxStretchMultiplier: number; colors: string[] }
> = {
  shorter: { speedMultiplier: 1, minStretchMultiplier: 1/3, maxStretchMultiplier: 2/3, colors: ["#63C34A", "#ffffff"] },
  taller: { speedMultiplier: 1, minStretchMultiplier: 0, maxStretchMultiplier: 1, colors: ["#63C34A", "#ffffff"] },
  free: { speedMultiplier: 1, minStretchMultiplier: 0, maxStretchMultiplier: 1, colors: ["#63C34A", "#ffffff"] }, // TBD
};

function Home() {
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<GrassLine[]>([]);
  const animationRef = useRef<number>(0);
  const navigate = useNavigate();
  const [variantIndex, setVariantIndex] = useState(0);
  const variantRef = useRef(variantIndex);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const generateLines = () => {
      const lines: GrassLine[] = [];
      const width = window.innerWidth;
      const lineCount = Math.floor(width / 8);
      const grassColors = ["#63C34A", "#ffffff"];

      for (let i = 0; i < lineCount; i++) {
        const x = (i / lineCount) * width + Math.random() * 0;
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

    const animate = () => {
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

        line.phase += line.speed * 0.015 * params.speedMultiplier;
        const stretchFactor = (Math.sin(line.phase) + 1) / 2;
        const minStretch = line.maxStretch * params.minStretchMultiplier;
        const maxStretch = line.maxStretch * params.maxStretchMultiplier;
        const actualStretch = minStretch + stretchFactor * (maxStretch - minStretch);
        const topY = bottomY - actualStretch * maxStretchZone;

        lineEl.setAttribute("y1", String(bottomY));
        lineEl.setAttribute("y2", String(topY));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

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

  const handleAnimationClick = () => {
    setVariantIndex((prev) => (prev + 1) % variants.length);
  };

  // Keep ref in sync with state for use in animation loop
  useEffect(() => {
    variantRef.current = variantIndex;
  }, [variantIndex]);

  return (
    <div className="grass-container">
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
      />

      <img
        src={relvaInstitutoText}
        alt="Instituto Relva de Ciencias Ambientais e Tecnologia"
        className="logo-bottom-right"
      />

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
  );
}

export default Home;
