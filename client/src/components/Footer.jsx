import "../styles/footer.css";
import { Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} CargoDo. All rights reserved.</p>

        <div className="footer-links">
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <Linkedin />
          </a>
          <a href="https://cargodo.io" target="_blank" rel="noreferrer">
            <Facebook />
          </a>
        </div>
      </div>
    </footer>
  );
}
