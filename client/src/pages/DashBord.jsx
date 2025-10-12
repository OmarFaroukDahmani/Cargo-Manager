import { useState, useEffect } from "react";
import { Truck, Package, ClipboardList, Users, PlusCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/dashbord.css";

export default function Dashboard() {
  const [packages, setPackages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchPackages = async () => {
      try {
        const response = await fetch(`https://cargo-mangement-api-5d076fcb0967.herokuapp.com/packages/${user.id}`);
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Stats
  const stats = [
    { label: "Active Shipments", value: packages.filter(p => p.status === "active").length, icon: <Truck /> },
    { label: "Delivered", value: packages.filter(p => p.status === "delivered").length, icon: <Package /> },
    { label: "Pending Orders", value: packages.filter(p => p.status === "pending").length, icon: <ClipboardList /> },
    { label: "On The Way", value: packages.filter(p => p.status === "on_the_way").length, icon: <Users /> },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="brand">
          <h1 className="logo">Cargo<span>Do</span></h1>
          <p>Welcome back, <span className="username">{user?.username}</span> 👋</p>
        </div>
        <div className="header-actions">
          <Link to="/create" className="create-btn">
            <PlusCircle size={18} /> Create Package
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Overview Section */}
      <section className="overview">
        <h2>Shipment Overview</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="icon-box">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages">
        <h2>Recent Packages</h2>
        {packages.length === 0 ? (
          <p className="empty">No packages found yet.</p>
        ) : (
          <ul className="package-list">
            {packages.slice(-5).map(pkg => (
              <li key={pkg.id} className="package-item">
                <div className="pkg-info">
                  <span className="pkg-title">📦 {pkg.title}</span>
                  <span className="pkg-meta">#{pkg.tracking_number} — {pkg.status.replace("_", " ")}</span>
                </div>
                <div className="pkg-actions">
                  <button onClick={() => handleEdit(pkg.id)} className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
