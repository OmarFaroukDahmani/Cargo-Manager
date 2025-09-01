import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/sign.css'


export default function Register() {
    const [values , setValues] = useState({
        username : "",
        email : "",
        password : ""
    })
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log(data);
        alert(data.message);
        
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
    };

  return (
    <div className="body">
        <div className="login-container">
            <h2 className="login-title">Register</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input type='text' required placeholder='Username' className='form-input' onChange={(e)=>{setValues({...values, username : e.target.value })}}/>
                <input  className="form-input" type="email" required placeholder='Email' onChange={(e)=>{setValues({...values, email : e.target.value })}} />
                <input className="form-input" type="password" required placeholder='Password' onChange={(e)=>{setValues({...values, password : e.target.value })}} />
                <button className="login-button" type='submit'>Register</button>
                <p className="register-text" >Do you have an account ?<span ><Link className="register-link" to={'/login'}>Log In</Link></span></p>
            </form>
        </div>
    </div>
  )
}
