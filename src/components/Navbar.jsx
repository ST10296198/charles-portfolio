import { NavLink, useLocation } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, House } from "lucide-react";

export default function Navbar() {
  const { pathname, key } = useLocation();
  const projectAlias = pathname.startsWith("/projects/");
  const projectPage = projectAlias || pathname.startsWith("/work/");
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    let anchor = Math.max(0, window.scrollY);
    let glass;
    let restoring = true;
    const showGlass = (visible) => {
      if (glass === visible) return;
      glass = visible;
      nav.dataset.glass = visible ? "visible" : "transparent";
    };
    const reset = () => {
      anchor = Math.max(0, window.scrollY);
      showGlass(anchor > 24);
    };
    const finishRestoration = () => {
      window.clearTimeout(settleTimer);
      restoring = false;
      reset();
    };
    const onInput = () => {
      if (!restoring) return;
      window.clearTimeout(settleTimer);
      restoring = false;
      anchor = Math.max(0, window.scrollY);
    };
    const handleScroll = () => {
      if (restoring) { reset(); return; }
      const position = Math.max(0, window.scrollY);
      if (position <= 24) {
        anchor = position;
        showGlass(false);
        return;
      }
      const distance = position - anchor;
      if (Math.abs(distance) >= 12) {
        showGlass(distance > 0);
        anchor = position;
      }
    };
    reset();
    // A bounded fallback also covers reduced-motion/no-op entrance animations.
    const settleTimer = window.setTimeout(finishRestoration, 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("portfolio:route-ready", finishRestoration);
    window.addEventListener("pageshow", finishRestoration);
    window.addEventListener("hashchange", finishRestoration);
    window.addEventListener("wheel", onInput, { passive: true });
    window.addEventListener("touchstart", onInput, { passive: true });
    window.addEventListener("keydown", onInput);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(settleTimer);
      window.removeEventListener("portfolio:route-ready", finishRestoration);
      window.removeEventListener("pageshow", finishRestoration);
      window.removeEventListener("hashchange", finishRestoration);
      window.removeEventListener("wheel", onInput);
      window.removeEventListener("touchstart", onInput);
      window.removeEventListener("keydown", onInput);
    };
  }, [pathname, key]);

  if (projectPage) {
    return (
      <header ref={navRef} className="project-home-nav">
        <MagneticButton to="/" className="project-home-control" ariaLabel="Back to homepage">
          <House size={18} aria-hidden="true" />
          <span>Home</span>
        </MagneticButton>
      </header>
    );
  }

  return (
    <header ref={navRef} className="navbar" data-surface={pathname === "/code" ? "dark" : "light"}>
    <div className="nav-identity">
      <MagneticButton to="/" className="brand" ariaLabel="Charles — Home">
        C.
      </MagneticButton>
    </div>

    <nav className="nav-links" aria-label="Main navigation">
    <NavLink to="/" end>Home</NavLink>
    <NavLink to="/work" className={({ isActive }) => isActive || projectAlias ? "active" : ""}
      aria-current={projectAlias ? "page" : undefined}>Work</NavLink>
    <NavLink to="/code">Code</NavLink>
    <NavLink to="/profile">Profile</NavLink>
    </nav>

    <NavLink to="/contact" className={({ isActive }) => `nav-contact${isActive ? " active" : ""}`}>
    Let's talk
    <ArrowUpRight size={16} />
    </NavLink>
    </header>
  );
}
