import { Truck, Package, Globe, Clock, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import CargoImg from "/cargo.jpg";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home">
        {/* Hero */}
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Streamline Your Logistics Operations</h1>
            <p>
              CargoDo empowers businesses to manage shipments, track packages, 
              and scale delivery efficiency worldwide.
            </p>
            <div className="hero-buttons">
              <a href="/sign-up" className="btn-primary">Start for Free</a>
              <a href="/learn-more" className="btn-outline">Learn More</a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <h2>Powerful Features to Simplify Logistics</h2>
          <div className="feature-grid">
            <FeatureCard icon={<Truck />} title="Real-Time Tracking" desc="Track your cargo with live GPS and instant updates." />
            <FeatureCard icon={<Package />} title="Smart Inventory" desc="Manage all your shipments in one centralized dashboard." />
            <FeatureCard icon={<Globe />} title="Global Expansion" desc="Connect your logistics operations globally with ease." />
            <FeatureCard icon={<Clock />} title="Optimized Delivery" desc="Accelerate delivery and minimize transit delays." />
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Join 10,000+ businesses using CargoDo</h2>
          <p>Start optimizing your supply chain today.</p>
          <a href="/sign-up" className="btn-primary">Get Started</a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
