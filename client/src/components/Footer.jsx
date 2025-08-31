import React from 'react'
import '../styles/footer.css'

export default function Footer() {
  return (
 <footer className="footer">
      <div className="footer-container">
        
        {/* Logo + About */}
        <div className="footer-section">
          <h2 className="footer-logo">CargoDo</h2>
          <p className="footer-text">
            Helping people connect and grow since 2025.  
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@myapp.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="socials">
            <a href="#">🌐</a>
            <a href="#">🐦</a>
            <a href="#">📸</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p> &copy; {new Date().getFullYear()} CargoDo. All rights reserved.</p>
      </div>
    </footer>
  )
}
