import '../css/notification.css';

const Notification = ({ message, visible }) => {
    return (
        <div className="notification-container">
            <div className={`notification ${visible ? 'show' : ''}`}>
            {message}
        </div> 
        </div>

    );
};

export default Notification;