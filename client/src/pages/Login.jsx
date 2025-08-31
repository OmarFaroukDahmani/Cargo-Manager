import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/sign.css'

export default function Login() {
    const [values , setValues] = useState({
        email : "",
        password : ""
    })
    const handelSubmit = (e)=>{
        e.preventDefault
    }
  return (
    <div className="body">
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handelSubmit} className="login-form">
                <input  className="form-input" type="email" required placeholder='Email' onChange={(e)=>{setValues({...values, email : e.target.value })}} />
                <input className="form-input" type="password" required placeholder='Password' onChange={(e)=>{setValues({...values, password : e.target.value })}} />
                <button className="login-button" type='submit'>Login</button>
                <p className="register-text" >Don't you have an account ? <span ><Link className="register-link" to={'/sign-up'}>Register</Link></span></p>
            </form>
        </div>
    </div>
  )
}
