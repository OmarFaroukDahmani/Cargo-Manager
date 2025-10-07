import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/sign.css';

export default function Login() {
  const [values, setValues] = useState({ userid: "", password: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://cargo-mangement-api-5d076fcb0967.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: values.userid, password: values.password }),
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
    <div className="register-body"> {/* same fullscreen background */}
      <div className="register-card"> {/* same card style */}
        <h2 className="register-title">Welcome Back</h2>
        <p className="register-subtitle">Log in to continue managing your cargodo 📦</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            className="form-input"
            type="text"
            required
            placeholder="Username / Email"
            value={values.userid}
            onChange={(e) => setValues({ ...values, userid: e.target.value })}
          />
          <input
            className="form-input"
            type="password"
            required
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button className="register-button" type="submit">Login</button>

          {values.message && <p className="error">{values.message}</p>}

          <p className="register-text">
            Don’t have an account?{" "}
            <Link className="register-link" to="/sign-up">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
