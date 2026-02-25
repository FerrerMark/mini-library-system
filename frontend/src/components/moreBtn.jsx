import { useState, useEffect } from 'react';
import '../css/moreBtn.css';
import { LoginForm } from './LoginForm.jsx';
import Notification from './notification.jsx';
import ConfirmModal from './confirmModal.jsx';

const AddBook = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  return (
    <>
      <a href="/mybooks" onClick={handleClick}>
        <div className="AddBook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 8v11c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19q0-.15.024-.273c.112-.576.584-.717.988-.727H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3zm3-4h13v12H5V5c0-.806.55-.988 1-1" />
            <path fill="currentColor" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" />
          </svg>
        </div>
      </a>
      <Notification message="You need to login first." visible={showNotification} />
    </>
  );
};

const Favorite = ({ onClick }) => (
  <div className="favorite" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 11.5c0 5.068-5.972 8.47-7.596 9.302a.88.88 0 0 1-.808 0C9.972 19.97 4 16.568 4 11.5C4 7 7.876 4 12 4c4.267 0 8 3 8 7.5Z"/>
        <path d="m8.97 11.81l2.799 2.947c.092.097.139.146.195.157a.2.2 0 0 0 .072 0c.056-.011.103-.06.195-.157l2.799-2.946a1.806 1.806 0 1 0-2.898-2.107l-.07.128a.071.071 0 0 1-.124 0l-.07-.128A1.806 1.806 0 1 0 8.97 11.81Z"/>
      </g>
    </svg>
  </div>
);

const Login = ({ onClick }) => (
  <div className="login" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
      />
    </svg>
  </div>
);

const Logout = ({ onClick }) => (
  <div className="logout" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
      <path fill="currentColor" d="M25.145 9.14v4.57h-6.1v3.05h6.1v4.57h1.52v-1.52h1.53v-1.52h1.52v-1.53h1.52v-3.05h-1.52v-1.52h-1.52v-1.52h-1.53V9.14zM20.575 21.33h1.52v6.1h-1.52zM20.575 1.52h1.52v7.62h-1.52zM14.475 30.48v-1.53h6.1v-1.52h-6.1V7.62h-1.52v22.86zM8.385 30.48h4.57V32h-4.57zM9.905 16.76h1.52v3.05h-1.52zM9.905 6.1h3.05v1.52h-3.05zM5.335 28.95h3.05v1.53h-3.05zM6.855 5.07h3.05V6.1h-3.05zM0.765 28.95h3.05v1.52h-3.05zM2.295 4.57h3.04v1.52h-3.04z"/>
      <path fill="currentColor" d="M2.285 0v1.52H.765v25.91h1.52V3.05h1.53V1.52h16.76V0z"/>
    </svg>
  </div>
);

const AddBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
    if (isOpen) setShowLoginForm(false);
  };

  const handleLoginClick = () => setShowLoginForm(true);

  const handleLogoutClick = () => setShowConfirm(true);

  const confirmLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="add-btn">
      {isOpen && (
        <>
          <Favorite />
          <AddBook />
          {isLoggedIn
            ? <Logout onClick={handleLogoutClick} />
            : <Login onClick={handleLoginClick} />}
        </>
      )}
      {showLoginForm && <LoginForm />}
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div className="add-icon" onClick={toggleButtons}>
        {isOpen ? 'x' : '+'}
      </div>
    </div>
  );
};

export default AddBtn;
