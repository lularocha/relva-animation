import { useEffect, useRef } from "react";
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

function Home() {
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<GrassLine[]>([]);
  const animationRef = useRef<number>(0);
  const navigate = useNavigate();

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

      lineElements.forEach((lineEl, index) => {
        const line = linesRef.current[index];
        if (!line) return;

        line.phase += line.speed * 0.015;
        const stretchFactor = (Math.sin(line.phase) + 1) / 2;
        const actualStretch = stretchFactor * line.maxStretch;
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

  const handleClick = () => {
    navigate("/about");
  };

  return (
    <div className="grass-container">
      <img
        src={relvaFullLogo}
        alt="Relva"
        className="logo-top-center"
        onClick={handleClick}
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
      />
    </div>
  );
}

export default Home;
