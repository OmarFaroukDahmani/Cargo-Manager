import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/createpage.css';

export default function Edit() {
  const [values, setValues] = useState({
    title: "",
    origin: "",
    destination: "",
    price: "",
    tracking_number: "",
    description: "",
    status: "pending",
    message: ""
  });

  const { id } = useParams(); // package ID from URL
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch the package data on mount
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/edit/${id}`);
        const data = await response.json();
        setValues({
          title: data.title,
          origin: data.origin,
          destination: data.destination,
          price: data.price,
          tracking_number: data.tracking_number,
          description: data.description,
          status: data.status,
          message: ""
        });
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackage();
  }, [id]);

  // Handle submit (update package)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...values,
        user_id: user.id,
        price: parseFloat(values.price)
      };

      const response = await fetch(`http://localhost:5000/edit/${id}`, {
        method: "PUT", // Update instead of create
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setValues({ ...values, message: data.message });
      navigate(`/dashboard/${user.id}`); // redirect to dashboard

    } catch (error) {
      console.error("Error updating package:", error);
      setValues({ ...values, message: "Something went wrong!" });
    }
  };

  return (
    <div className="create-container">
      <h2>Edit Package</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          placeholder="Title"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Origin"
          value={values.origin}
          onChange={(e) => setValues({ ...values, origin: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={values.destination}
          onChange={(e) => setValues({ ...values, destination: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={values.price}
          onChange={(e) => setValues({ ...values, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tracking Number"
          value={values.tracking_number}
          onChange={(e) => setValues({ ...values, tracking_number: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        />
        <select
          value={values.status}
          onChange={(e) => setValues({ ...values, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="on_the_way">On The Way</option>
          <option value="delivered">Delivered</option>
        </select>

        <button type="submit">Update Package</button>
        <p className="message">{values.message}</p>
      </form>
    </div>
  );
}
