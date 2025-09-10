import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";  
import '../styles/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <h1 className="logo">CargoDo</h1>

        {/* Hamburger for mobile */}
        <button 
          className="menu-btn" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>

          <div className="nav-actions">
            <Link to="/sign-up" className="btn btn-signup">Create Account</Link>
            <Link to="/login" className="btn btn-login">Log In</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
