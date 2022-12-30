import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../other/useAuth'
import axiosAll from '../../other/axiosAll'
import './login.css'

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { setAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosAll.post('auth/login',
                JSON.stringify({ username, password }),
            );

            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            const id = response?.data?.id;
            setAuth({ username, roles, accessToken, id });
            localStorage.setItem("user", JSON.stringify(response?.data));

            setUsername('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className='login-container'>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="content">
                        <div className="input-field">
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <a href="#" className="link">Forgot Your Password?</a>
                    </div>
                    <div className="action">
                        <button>Sign in</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login