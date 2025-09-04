import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/sign.css';

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = `/dashboard/${data.user.id}`;
      } else {
        setValues({ ...values, message: data.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setValues({ ...values, message: "Something went wrong. Please try again." });
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
          
          <p className="error">{values.message}</p> 

          <p className="register-text">
            Don't you have an account? 
            <span>
              <Link className="register-link" to={'/sign-up'}>Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
