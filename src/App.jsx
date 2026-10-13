import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Work from "./pages/Work";
import Code from "./pages/Code";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

import TCI from "./pages/projects/TCI";
import BCC from "./pages/projects/BCC";
import Eddie from "./pages/projects/Eddie";
import AgriEnergy from "./pages/projects/AgriEnergy";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/home.css";
import "./styles/work.css";
import "./styles/project.css";
import "./styles/code.css";
import "./styles/profile.css";
import "./styles/contact.css";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
<Routes location={location} key={location.pathname}>

  {/* Main Pages */}
  <Route path="/" element={<Home />} />
  <Route path="/work" element={<Work />} />
  <Route path="/code" element={<Code />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/contact" element={<Contact />} />

  {/* Project Case Studies */}
  <Route path="/projects/tci" element={<TCI />} />
  <Route path="/projects/bcc" element={<BCC />} />
  <Route path="/projects/eddie" element={<Eddie />} />
  <Route
    path="/projects/agri-energy"
    element={<AgriEnergy />}
  />

  {/* Existing /work links */}
  <Route path="/work/tci" element={<TCI />} />
  <Route path="/work/bcc" element={<BCC />} />
  <Route path="/work/eddie" element={<Eddie />} />
  <Route
    path="/work/agri-energy"
    element={<AgriEnergy />}
  />

</Routes>
    </AnimatePresence>
  );
}

export default App;