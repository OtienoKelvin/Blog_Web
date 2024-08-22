import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))

    }
    
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post('/auth/register', inputs)
            navigate('/login')
            
        }catch (err) {
            setError(err.response.data)
        }
    }


    return (
        <div className="auth">
        <h1>Register</h1>
        <form>
            <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange}  />
            <input type="password" name="password" placeholder="password" required onChange={handleChange}  />
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>Do you have an account? <Link to="/register">Register</Link></span>
        </form>
    </div>
    )
}

export default Register