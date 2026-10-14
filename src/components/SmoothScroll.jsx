import { createContext, useContext, useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollLifecycle = createContext(null);

// No DOM wrapper: this boundary mounts with the displayed route, after any exit.
export function ScrollRoute({ children, location, navigationType }) {
  const lifecycle = useContext(ScrollLifecycle);

  useEffect(() => lifecycle.current?.(location, navigationType), [
    lifecycle, location, navigationType,
  ]);

  return children;
}

export default function SmoothScroll({ children }) {
  const lifecycle = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    let lenis;
    let unsubscribe;
    let activeEntry;
    let pendingPosition;
    let disposed = false;
    const positions = new Map();

    const savePosition = () => {
      if (!activeEntry) return;
      const position = pendingPosition && !pendingPosition.hash
        ? pendingPosition : { x: window.scrollX, y: window.scrollY };
      positions.set(activeEntry, position);
      try {
        sessionStorage.setItem(`portfolio-scroll:${activeEntry}`, JSON.stringify(position));
      } catch { /* Restoration still works in memory when storage is unavailable. */ }
    };

    const readPosition = (entry) => {
      try {
        const position = positions.get(entry) ?? JSON.parse(
          sessionStorage.getItem(`portfolio-scroll:${entry}`),
        );
        return Number.isFinite(position?.x) && Number.isFinite(position?.y)
          ? position : null;
      } catch { return null; }
    };

    const moveTo = ({ x, y }) => {
      if (lenis) {
        lenis.scrollTo(y, { immediate: true, force: true });
        if (window.scrollX !== x) window.scrollTo({ left: x, top: window.scrollY, behavior: "instant" });
      } else {
        window.scrollTo({ left: x, top: y, behavior: "instant" });
      }
    };

    const restorePosition = () => {
      if (!pendingPosition) return;
      if (pendingPosition.hash) {
        let id;
        try { id = decodeURIComponent(pendingPosition.hash.slice(1)); }
        catch { id = pendingPosition.hash.slice(1); }
        const target = document.getElementById(id) ?? document.getElementsByName(id)[0];
        if (!target) return;
        lenis?.reset();
        target.scrollIntoView({ behavior: "instant" });
        lenis?.reset();
        pendingPosition = null;
      } else {
        moveTo(pendingPosition);
        // Retry after images/fonts load if the destination was initially too short.
        if (Math.abs(window.scrollY - pendingPosition.y) < 1) pendingPosition = null;
      }
    };

    const refresh = () => {
      if (disposed) return;
      // Remeasure before restoration and ScrollTrigger's layout measurements.
      lenis?.resize();
      restorePosition();
      ScrollTrigger.refresh();
    };
    const refreshCall = gsap.delayedCall(0.1, refresh).pause();
    const scheduleRefresh = () => refreshCall.restart(true);
    const tick = () => lenis?.raf(performance.now());

    const configureScrolling = () => {
      gsap.ticker.remove(tick);
      unsubscribe?.();
      unsubscribe = undefined;
      lenis?.destroy();
      lenis = undefined;
      if (!reducedMotion.matches && !coarsePointer.matches) {
        lenis = new Lenis({
          autoRaf: false,
          smoothWheel: true,
          syncTouch: false,
          anchors: false,
          allowNestedScroll: true,
        });
        unsubscribe = lenis.on("scroll", ScrollTrigger.update);
        // Real milliseconds avoid changing GSAP's global lag-smoothing policy.
        gsap.ticker.add(tick);
      }
      scheduleRefresh();
    };

    lifecycle.current = (location, navigationType) => {
      // Full-document links initially have Router's default key. Give that history
      // entry a stable ID without replacing Router's existing history state.
      let entry = location.key;
      if (entry === "default") {
        entry = window.history.state?.portfolioScrollKey ?? crypto.randomUUID();
        window.history.replaceState({ ...window.history.state, portfolioScrollKey: entry }, "");
      }
      activeEntry = entry;
      lenis?.reset();
      const saved = navigationType === "POP" ? readPosition(entry) : null;
      pendingPosition = saved ?? (location.hash
        ? { hash: location.hash }
        : { x: 0, y: 0 });
      refresh();
      scheduleRefresh();
      return () => {
        savePosition();
        pendingPosition = null;
        activeEntry = undefined;
      };
    };

    // Native anchors retain URL/history/focus semantics. Cancel wheel inertia
    // before the browser performs its default anchor or keyboard scroll.
    const cancelRestoration = () => { pendingPosition = null; };
    const onClick = (event) => {
      const link = event.target.closest?.("a[href]");
      if (link) lenis?.reset();
    };
    const onKeyDown = (event) => {
      if (event.target.closest?.("input, textarea, select, [contenteditable]")) return;
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        cancelRestoration();
        lenis?.reset();
      }
    };
    const onHashChange = () => { cancelRestoration(); lenis?.reset(); scheduleRefresh(); };
    const onNativeInteraction = () => { cancelRestoration(); lenis?.reset(); };
    const onPageShow = (event) => {
      window.history.scrollRestoration = "manual";
      if (event.persisted) { lenis?.reset(); scheduleRefresh(); }
    };
    const onPageHide = () => {
      savePosition();
      window.history.scrollRestoration = previousRestoration;
    };

    const root = document.getElementById("root");
    const resizeObserver = new ResizeObserver(scheduleRefresh);
    resizeObserver.observe(root);
    root.addEventListener("load", scheduleRefresh, true);
    root.addEventListener("error", scheduleRefresh, true);
    window.addEventListener("resize", scheduleRefresh);
    window.addEventListener("portfolio:route-ready", scheduleRefresh);
    window.addEventListener("click", onClick, true);
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("wheel", cancelRestoration, { passive: true });
    window.addEventListener("touchstart", cancelRestoration, { passive: true });
    window.addEventListener("pointerdown", onNativeInteraction, { passive: true });
    window.addEventListener("focusin", onNativeInteraction);
    window.addEventListener("popstate", onNativeInteraction);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);
    reducedMotion.addEventListener("change", configureScrolling);
    coarsePointer.addEventListener("change", configureScrolling);
    document.fonts?.ready.then(() => { if (!disposed) scheduleRefresh(); });
    configureScrolling();

    return () => {
      savePosition();
      disposed = true;
      lifecycle.current = null;
      refreshCall.kill();
      resizeObserver.disconnect();
      root.removeEventListener("load", scheduleRefresh, true);
      root.removeEventListener("error", scheduleRefresh, true);
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("portfolio:route-ready", scheduleRefresh);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("wheel", cancelRestoration);
      window.removeEventListener("touchstart", cancelRestoration);
      window.removeEventListener("pointerdown", onNativeInteraction);
      window.removeEventListener("focusin", onNativeInteraction);
      window.removeEventListener("popstate", onNativeInteraction);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
      reducedMotion.removeEventListener("change", configureScrolling);
      coarsePointer.removeEventListener("change", configureScrolling);
      gsap.ticker.remove(tick);
      unsubscribe?.();
      lenis?.destroy();
      window.history.scrollRestoration = previousRestoration;
    };
  }, [lifecycle]);

  return <ScrollLifecycle.Provider value={lifecycle}>{children}</ScrollLifecycle.Provider>;
}
