import { Card, CardContent } from "../components/Card"; // use local Card
import "../styles/card.css";
import '../styles/dashbord.css'
import { Truck, Package, ClipboardList, Users } from "lucide-react";

export default function DashBord() {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="home-header">
        <h1>Cargo Manager</h1>
        <p>Track, manage, and optimize your cargo operations in real time.</p>
      </header>

      {/* Stats Section */}
      <section className="stats">
        <Card>
          <CardContent>
            <Truck className="icon" />
            <h2>120</h2>
            <p>Active Shipments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Package className="icon" />
            <h2>540</h2>
            <p>Packages Delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <ClipboardList className="icon" />
            <h2>32</h2>
            <p>Pending Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Users className="icon" />
            <h2>15</h2>
            <p>Drivers On Duty</p>
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity */}
      <section className="activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>🚚 Shipment #1023 departed from New York</li>
          <li>📦 Package #5421 delivered in Berlin</li>
          <li>⏳ Order #332 pending confirmation</li>
          <li>👨‍✈️ Driver Ahmed assigned to Shipment #1040</li>
        </ul>
      </section>
    </div>
  );
}
