import { useState } from 'react';
import Notification from '../components/notification';
import '../css/registerForm.css';

const Register = () => {
    const [notification, setNotification] = useState({ message: '', visible: false });

    const register = (event) => {
        event.preventDefault();
        const URL = process.env.REACT_APP_API_URL;

        fetch(`${URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            setNotification({ message: 'User registered successfully!', visible: true });
            event.target.reset();
            setTimeout(() => setNotification({ message: '', visible: false }), 3000);
        })
        .catch(err => {
            setNotification({ message: 'Registration failed.', visible: true });
            setTimeout(() => setNotification({ message: '', visible: false }), 3000);
        });
    };

    return (
        <div className="registerForm">
            <Notification message={notification.message} visible={notification.visible} />
            <form onSubmit={register}>
                <h2>Register</h2>
                <input type="text" name="name" placeholder='Name' required />
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Register</button>
                <p>Already have an account? <a href="/">HOME</a></p>
            </form>
        </div>
    );
};

export default Register;
