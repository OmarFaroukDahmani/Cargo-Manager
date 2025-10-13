import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          CargoDo
        </Link>

        {/* The burger menu toggle button - Visible only on small screens */}
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* The navigation menu - Displayed differently based on screen size */}
        <nav className={`nav-menu ${open ? "active" : ""}`}>
          <ul className="nav-list">
            <li><a href="#features" onClick={() => setOpen(false)}>Features</a></li>
            <li><a href="#stats" onClick={() => setOpen(false)}>Stats</a></li>
            <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          </ul>

          <div className="nav-buttons">
            <Link to="/login" className="btn-outline" onClick={() => setOpen(false)}>Log In</Link>
            <Link to="/sign-up" className="btn-primary" onClick={() => setOpen(false)}>Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}