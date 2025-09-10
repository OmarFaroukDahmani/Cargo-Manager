import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo + About */}
        <div className="footer-logo-section">
          <h2 className="footer-logo">CargoDo</h2>
          <p className="footer-text">Connecting logistics businesses worldwide since 2025.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>

        {/* Social */}
        <div className="footer-socials">
          <a href="#">🌐</a>
          <a href="#">🐦</a>
          <a href="#">📸</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CargoDo. All rights reserved.</p>
      </div>
    </footer>
  );
}
