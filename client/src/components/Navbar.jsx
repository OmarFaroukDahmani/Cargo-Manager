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

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

        <nav className={`nav-menu ${open ? "active" : ""}`}>
          <ul className="nav-list">
            <li><a href="#features" onClick={() => setOpen(false)}>Features</a></li>
            <li><a href="#stats" onClick={() => setOpen(false)}>Stats</a></li>
            <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          </ul>

          <div className="nav-buttons">
            <Link to="/login" className="btn-outline">Log In</Link>
            <Link to="/sign-up" className="btn-primary">Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
