
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate('/') // Navigate to home page after successful login
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="auth">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    required 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required 
                    onChange={handleChange} 
                />
                <button type="submit">Login</button>
                {err && <p>{err}</p>}
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    );
};

export default Login;
