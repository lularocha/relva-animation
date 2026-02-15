import { useEffect, useRef } from "react";
import "./App.css";

import relvaFullLogo from "./assets/logos/relva-app-symbol-woodmark.svg";
import relvaWordmark from "./assets/logos/relva-app-woodmark.svg";
import relvaInstitutoText from "./assets/logos/relva-app-text.svg";

interface GrassLine {
  x: number;
  strokeWidth: number;
  speed: number;
  phase: number;
  maxStretch: number; // Maximum stretch height (0-1, where 1 = 50% of canvas)
  color: string; // Random grass color
}

function App() {
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<GrassLine[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Generate vertical grass lines with stretching animation
    const generateLines = () => {
      const lines: GrassLine[] = [];
      const width = window.innerWidth;
      const lineCount = Math.floor(width / 8); // Density of lines
      const grassColors = ["#63C34A", "#ffffff"]; // Two grass colors

      for (let i = 0; i < lineCount; i++) {
        const x = (i / lineCount) * width + Math.random() * 0;
        const strokeWidth = 2 + Math.random() * 0; // Variable stroke width
        const speed = 0.5 + Math.random() * 1.5; // Stretching speed
        const phase = Math.random() * Math.PI * 2; // Random starting phase
        const maxStretch = 0.3 + Math.random() * 0.7; // Max stretch (30%-100% of 50% canvas)
        const color = grassColors[i % grassColors.length]; // Alternating colors

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

    // Create line elements
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

    // Animation loop
    const animate = () => {
      const lineElements = svg.querySelectorAll("line");
      const canvasHeight = window.innerHeight;
      const bottomY = canvasHeight * (2 / 3); // Start at 1/3 from bottom (2/3 from top)
      const maxStretchZone = canvasHeight / 3; // Max stretch is 1/3 of canvas

      lineElements.forEach((lineEl, index) => {
        const line = linesRef.current[index];
        if (!line) return;

        // Update phase for smooth stretching animation
        line.phase += line.speed * 0.015;

        // Calculate stretch using sine wave (0 to 1)
        const stretchFactor = (Math.sin(line.phase) + 1) / 2; // 0 to 1

        // Apply max stretch constraint for this line
        const actualStretch = stretchFactor * line.maxStretch;

        // Calculate top Y position - line stretches from bottom
        const topY = bottomY - actualStretch * maxStretchZone;

        lineEl.setAttribute("y1", String(bottomY));
        lineEl.setAttribute("y2", String(topY));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
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

  return (
    <div className="grass-container">
      {/* Top center - Full logo (symbol + wordmark) */}
      <img
        src={relvaFullLogo}
        alt="Relva"
        className="logo-top-center"
      />

      {/* Bottom left - Wordmark only */}
      <img
        src={relvaWordmark}
        alt="Relva"
        className="logo-bottom-left"
      />

      {/* Bottom right - Instituto text (vertical) */}
      <img
        src={relvaInstitutoText}
        alt="Instituto Relva de Ciências Ambientais e Tecnologia"
        className="logo-bottom-right"
      />

      <svg
        ref={svgRef}
        className="grass-svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      />
    </div>
  );
}

export default App;
