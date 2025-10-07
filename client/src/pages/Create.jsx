import { useState } from 'react';
import '../styles/createpage.css';

export default function Create() {
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
const handleSubmit = async (e) => {
  const user = JSON.parse(localStorage.getItem("user"));
  e.preventDefault();

  try {
    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Include user_id in the payload
    const payload = {
      ...values,
      user_id: user.id,
      price: parseFloat(values.price) // ensure number
    };

    const response = await fetch("https://cargo-mangement-api-5d076fcb0967.herokuapp.com/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setValues({ ...values, message: data.message });
    window.location.href = `/dashboard/${user.id}`;

  } catch (error) {
    console.error("Error:", error);
    setValues({ ...values, message: "Something went wrong!" });
  }
};

return (
    <div className="create-container">
      <h2>Create a New Package</h2>
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

        <button type="submit">Create Package</button>
        <p className="message">{values.message}</p>
      </form>
    </div>
  );
}

