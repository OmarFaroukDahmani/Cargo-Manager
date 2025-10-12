import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">CargoDo</Link>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav className={`nav-menu ${open ? "active" : ""}`}>
          <ul className="nav-list">
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/about">About</Link></li>
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
