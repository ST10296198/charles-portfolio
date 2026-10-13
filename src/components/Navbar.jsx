import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${compact ? "navbar--compact" : ""}`}>
    <Link to="/" className="brand">
    C.
    </Link>

    <nav className="nav-links">
    <Link to="/">Index</Link>
    <Link to="/work">Work</Link>
    <Link to="/code">Code</Link>
    <Link to="/profile">Profile</Link>
    </nav>

    <Link to="/contact" className="nav-contact">
    Let's talk
    <ArrowUpRight size={16} />
    </Link>
    </header>
  );
}