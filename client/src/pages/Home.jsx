import { Truck, Package, Globe, Clock, Users } from "lucide-react";
import Cargo from '/cargo.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/home.css';
import { useEffect, useState } from "react";

export default function Home() {
  const [stats, setStats] = useState({ userCount: 0, packageCount: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="landing">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Manage Your Cargo with Ease</h1>
            <p>
              Cargo Manager helps you track shipments, optimize delivery, and grow
              your logistics business faster.
            </p>
            <div className="hero-buttons">
              <a href="/sign-up" className="btn-primary">Get Started</a>
              <a href="/learn-more" className="btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={Cargo} alt="Cargo" />
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Why Choose Cargo Manager?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <Truck className="icon" />
              <h3>Real-time Tracking</h3>
              <p>Monitor your shipments live from pickup to delivery.</p>
            </div>
            <div className="feature-card">
              <Package className="icon" />
              <h3>Inventory Management</h3>
              <p>Keep control over packages and warehouses in one place.</p>
            </div>
            <div className="feature-card">
              <Globe className="icon" />
              <h3>Global Reach</h3>
              <p>Expand your logistics operations worldwide with ease.</p>
            </div>
            <div className="feature-card">
              <Clock className="icon" />
              <h3>Faster Delivery</h3>
              <p>Save time and money with optimized delivery routes.</p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="stats">
          <h2>Our Impact in Numbers</h2>
          <div className="stats-grid">
            <div className="stat">
              <Users className="icon" />
              <h3>{stats.userCount}</h3>
              <p>Registered Users</p>
            </div>
            <div className="stat">
              <Package className="icon" />
              <h3>{stats.packageCount}</h3>
              <p>Packages Managed</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta">
          <h2>Ready to Simplify Your Cargo Management?</h2>
          <p>Join thousands of logistics businesses already using Cargo Manager.</p>
          <a href="/sign-up" className="btn-primary">Start Free Trial</a>
        </section>
      </div>
      <Footer />
    </>
  );
}
