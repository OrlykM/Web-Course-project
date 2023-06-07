import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../styles/style.module.scss"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [errors, setErrors] = useState({});

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrors({ message: 'Email and password are required' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            setErrors({ message: 'Invalid email format' });
            return;
        }

        const encodedCredentials = btoa(`${username}:${password}`);
        const response = await fetch('http://localhost:5000/user/self', {
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
            },
        });

        if (response.ok) {
            sessionStorage.setItem('Authorization', `Basic ${encodedCredentials}`);
            setAuthenticated(true);
        } else {
            setErrors({ message: 'Authentication failed' });
        }
    };

    if (authenticated) {
        navigate('/ad');
    }

    return (
        <form onSubmit={handleSubmit}>
            <br />
            <label>
                Email:
            </label>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <label>
                Password:
            </label>
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Log in</button>
            <span>Forgot password ?<Link to={"/reset"}>Reset password</Link></span>
            <br />
            {errors && <span>{errors.message}</span>}
        </form>
    );
}

export default Login;
