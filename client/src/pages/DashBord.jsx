import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";
import "../styles/card.css";
import '../styles/dashbord.css';
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Truck, Package, ClipboardList, Users } from "lucide-react";

export default function DashBord() {
  const [packages, setPackages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Fetch user packages on component mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchPackages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/packages/${user.id}`);
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [user, navigate]);
  // edit package
  const handleEdit = (id) =>{
    navigate(`/edit/${id}`)
  }
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Stats calculations
  const activeShipments = packages.filter(p => p.status === "active").length;
  const deliveredPackages = packages.filter(p => p.status === "delivered").length;
  const pendingOrders = packages.filter(p => p.status === "pending").length;
  const onTheWay = packages.filter(p => p.status === "on_the_way").length;

  return (
    <>
      <div className="homepage">
        <header className="home-header">
          <h1>CargoDo</h1>
          <p className="greeting">Welcome <span>{user.username}</span></p>
          <button className="logout" onClick={handleLogout}>Log out</button>
        </header>
        <p id="sec">Track, manage, and optimize your cargo operations in real time.</p>
        <div className="button">
          <Link to={'/create'}><button>Create</button></Link>
        </div>

        <section className="stats">
          <Card>
            <CardContent>
              <Truck className="icon" />
              <h2>{activeShipments}</h2>
              <p>Active Shipments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Package className="icon" />
              <h2>{deliveredPackages}</h2>
              <p>Packages Delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <ClipboardList className="icon" />
              <h2>{pendingOrders}</h2>
              <p>Pending Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Users className="icon" />
              <h2>{onTheWay}</h2>
              <p>On The Way</p>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        <section className="activity">
          <h2>All of your packages</h2>
          <ul>
            {packages.length === 0 ? (
              <li>No packages yet</li>
            ) : (
              packages.slice(-5).map(pkg => (
                <li key={pkg.id}>
                  📦 {pkg.title} (#{pkg.tracking_number}) — {pkg.status.replace("_", " ")} 
                    <button onClick={() => handleEdit(pkg.id)} className="edit">Edit</button>
                    <button  className="delete">Delete</button>

                </li>
              ))
            )}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
