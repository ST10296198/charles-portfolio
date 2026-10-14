import { useId, useLayoutEffect, useRef, useState } from "react";

export default function ArchitectureDiagram({ label, nodes, connections, columns = 3 }) {
  const canvasRef = useRef(null);
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [geometry, setGeometry] = useState({ width: 1, height: 1, paths: {} });
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [selected, setSelected] = useState(null);
  const active = focused ?? hovered ?? selected;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      // Layout offsets ignore GSAP's entrance transforms and ordinary scrolling.
      const boxes = new Map(Array.from(canvas.querySelectorAll("[data-architecture-node]"))
        .map((node) => [node.dataset.architectureNode, {
          x: node.offsetLeft, y: node.offsetTop,
          width: node.offsetWidth, height: node.offsetHeight,
        }]));
      const paths = {};
      connections.forEach((connection, index) => {
        const from = boxes.get(connection.from);
        const to = boxes.get(connection.to);
        if (!from || !to) return;
        const fy = from.y + from.height / 2;
        const ty = to.y + to.height / 2;
        if (Math.abs(from.x - to.x) < 2) {
          // Stacked relationships use outside gutters, never through other nodes.
          const right = index % 2 === 1;
          const fx = from.x + (right ? from.width : 0);
          const tx = to.x + (right ? to.width : 0);
          const lane = right ? canvas.clientWidth - 8 : 8;
          paths[connection.id] = `M ${fx} ${fy} H ${lane} V ${ty} H ${tx}`;
        } else {
          const forward = to.x > from.x;
          const fx = from.x + (forward ? from.width : 0);
          const tx = to.x + (forward ? 0 : to.width);
          const middle = (fx + tx) / 2;
          paths[connection.id] = `M ${fx} ${fy} C ${middle} ${fy}, ${middle} ${ty}, ${tx} ${ty}`;
        }
      });
      const next = { width: canvas.clientWidth || 1, height: canvas.clientHeight || 1, paths };
      setGeometry((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    canvas.querySelectorAll("[data-architecture-node]").forEach((node) => observer.observe(node));
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [nodes, connections]);

  const labels = new Map(nodes.map((node) => [node.id, node.label]));

  return (
    <figure className="architecture-diagram" aria-label={label}>
      <div className="architecture-diagram__canvas" ref={canvasRef}
        style={{ "--architecture-columns": columns }}>
        <svg className="architecture-diagram__connections" aria-hidden="true" focusable="false"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none">
          <defs>
            <marker id={`${id}-arrow`} markerWidth="6" markerHeight="6"
              refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M 0 0 L 6 3 L 0 6" fill="none" stroke="currentColor" />
            </marker>
          </defs>
          {connections.map((connection) => (
            <path key={connection.id} data-architecture-connection
              data-from={connection.from} data-to={connection.to}
              className={`architecture-diagram__connection${active === connection.from || active === connection.to ? " is-active" : ""}`}
              d={geometry.paths[connection.id] ?? ""} pathLength="1" strokeDasharray="1"
              strokeDashoffset="0" markerEnd={`url(#${id}-arrow)`} />
          ))}
        </svg>
        {nodes.map((node, index) => (
          <div key={node.id} className="architecture-diagram__node" data-architecture-node={node.id}
            style={{ "--architecture-column": node.column, "--architecture-row": node.row }}>
            <button type="button" className={`architecture-node${active === node.id ? " is-active" : ""}`}
              aria-label={`Highlight connections for ${node.label}`}
              aria-describedby={`${id}-${node.id}-description`} aria-pressed={selected === node.id}
              onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)}
              onFocus={() => setFocused(node.id)} onBlur={() => setFocused(null)}
              onClick={() => setSelected((current) => current === node.id ? null : node.id)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{node.label}</strong>
              <small className="architecture-node__description" id={`${id}-${node.id}-description`}>
                {node.description}
              </small>
            </button>
          </div>
        ))}
      </div>
      <figcaption className="architecture-diagram__legend">
        <p>Hover, focus or select a node to highlight its connections.</p>
        <ul>
          {connections.map((connection) => (
            <li key={connection.id} className={active === connection.from || active === connection.to ? "is-active" : ""}>
              <strong>{labels.get(connection.from)} → {labels.get(connection.to)}</strong>
              <span>{connection.label}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
