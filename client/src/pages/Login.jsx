import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/sign.css';

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        window.location.href = "/dashboard"; // redirect example
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            className="form-input"
            type="email"
            required
            placeholder="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <input
            className="form-input"
            type="password"
            required
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button className="login-button" type="submit">Login</button>
          <p className="register-text">
            Don't you have an account? 
            <span><Link className="register-link" to={'/sign-up'}>Register</Link></span>
          </p>
        </form>
      </div>
    </div>
  );
}
