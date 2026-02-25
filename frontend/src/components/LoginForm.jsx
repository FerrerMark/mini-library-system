import { useState } from 'react';
import '../css/logInform.css';
import Notification from './notification';

export const LoginForm = () => {
    const [notification, setNotification] = useState({ message: '', visible: false });

    const handleLogin = (event) => {
        event.preventDefault();
        const URL = process.env.REACT_APP_API_URL;

        fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value
            })
        })
        .then(res => {
            if (!res.ok) throw new Error('Login failed');
            return res.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            setNotification({ message: `Login successful Welcome! ${data.user.name}`, visible: true });
            setTimeout(() => {
                setNotification({ message: '', visible: false });
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            console.error(err);
            setNotification({ message: 'Invalid credentials', visible: true });
            setTimeout(() => setNotification({ message: '', visible: false }), 3000);
        });
    };

    return (
        <div className="loginForm">
            <Notification message={notification.message} visible={notification.visible} />
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="text" name="email" placeholder="email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    );
};
