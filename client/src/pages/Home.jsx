import { useState, useEffect } from "react";
import { Truck, Package, Globe, Clock, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {
  const [stats, setStats] = useState({ userCount: 0, packageCount: 0 });

  useEffect(() => {
    fetch("https://cargo-mangement-api-5d076fcb0967.herokuapp.com/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <>
      <Navbar />
      <main className="home">
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Streamline Your Logistics Operations</h1>
            <p>
              CargoDo empowers businesses to manage shipments, track packages,
              and scale delivery efficiency worldwide.
            </p>
            <div className="hero-buttons">
              <a href="/sign-up" className="btn-primary">
                Start for Free
              </a>
              <a href="#features" className="btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features" id="features">
          <h2>Powerful Features to Simplify Logistics</h2>
          <div className="feature-grid">
            <FeatureCard
              icon={<Truck />}
              title="Real-Time Tracking"
              desc="Track your cargo with live GPS and instant updates."
              av="(Comming Soon)"
            />
            <FeatureCard
              icon={<Package />}
              title="Smart Inventory"
              desc="Manage all your shipments in one centralized dashboard."
            />
            <FeatureCard
              icon={<Globe />}
              title="Global Expansion"
              desc="Connect your logistics operations globally with ease."
              av="(Comming Soon)"
            />
            <FeatureCard
              icon={<Clock />}
              title="Optimized Delivery"
              desc="Accelerate delivery and minimize transit delays."
              av="(Comming Soon)"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats" id="stats">
          <h2>Our Impact in Numbers</h2>
          <p className="stats-subtitle">
            Trusted by logistics professionals around the globe
          </p>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-icon">
                <Users />
              </div>
              <h3>{stats.userCount.toLocaleString()}</h3>
              <p>Registered Users</p>
            </div>
            <div className="stat">
              <div className="stat-icon">
                <Package />
              </div>
              <h3>{stats.packageCount.toLocaleString()}</h3>
              <p>Packages Managed</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta" id="contact">
          <h2>Join {stats.userCount.toLocaleString()} businesses using CargoDo</h2>
          <p>Start optimizing your supply chain today.</p>
          <a href="/sign-up" className="btn-primary">
            Get Started
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeatureCard({ icon, title, desc, av }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <p className="alert">{av}</p>
    </div>
  );
}
