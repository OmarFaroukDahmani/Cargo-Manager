import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import "../styles/sign.css";

export default function Register() {
    const [message, setmessage] = useState("")
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://cargo-mangement-api-5d076fcb0967.herokuapp.com/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      navigate('/login')

    } catch (error) {
        setmessage(error.message)
    }
  };

  return (
    <div className="register-body">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">
          Join us and start managing your cargo with ease 🚀
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            required
            placeholder="Username"
            className="form-input"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="form-input"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="form-input"
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
          />
          <button className="register-button" type="submit">
            Sign Up
          </button>
        </form>
            <p>{message}</p>
        <p className="register-text">
          Already have an account?{" "}
          <Link className="register-link" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
