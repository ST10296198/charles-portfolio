import { useEffect, useRef, useState } from "react";
import LaserFlow from "./LaserFlow";

export default function CodeLaserScene({ children, surfaceRef }) {
  const sceneRef = useRef(null);
  const layerRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const [beamPosition, setBeamPosition] = useState(0.68);

  useEffect(() => {
    const scene = sceneRef.current;
    const layer = layerRef.current;
    const editor = surfaceRef.current;
    const desktop = window.matchMedia("(min-width: 701px) and (pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const configure = () => setAnimated(desktop.matches && !reducedMotion.matches);
    const measure = () => {
      const bounds = scene.getBoundingClientRect();
      const surface = editor.getBoundingClientRect();
      if (!bounds.width || !surface.width) return;
      // Keep the impact safely inside the panel's rounded corners.
      const impactX = surface.left - bounds.left + surface.width * 0.68;
      const position = Math.max(0, Math.min(1, impactX / bounds.width));
      const impactY = surface.top - bounds.top;
      scene.style.setProperty("--laser-x", `${position * 100}%`);
      scene.style.setProperty("--impact-y", `${impactY}px`);
      // The canvas includes the upper edge spill, not the whole page.
      layer.style.height = `${Math.max(1, impactY - layer.offsetTop + 128)}px`;
      setBeamPosition((previous) => Math.abs(previous - position) < 0.0001 ? previous : position);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    observer.observe(editor);
    const hero = scene.querySelector(".code-page-hero");
    if (hero) observer.observe(hero);
    let disposed = false;
    document.fonts?.ready.then(() => { if (!disposed) measure(); });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    measure();
    configure();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
    };
  }, [surfaceRef]);

  return (
    <div ref={sceneRef} className="code-laser-scene">
      <div ref={layerRef} className="code-laser-layer" aria-hidden="true">
        <LaserFlow surfaceRef={surfaceRef} enabled={animated} beamPosition={beamPosition}
          color="#ff5a1f" intensity={1.8} flare={1.5} spread={1.5} spill={1}
          fog={0.5} dust={1.6} beamWidth={1.5} streaks={1.5} dots={1}
          pulse={1.5} speed={1.5} seed={3} mouseInteraction intro dpr={1} />
      </div>
      <span className="code-laser-impact" aria-hidden="true" />
      {children}
    </div>
  );
}
