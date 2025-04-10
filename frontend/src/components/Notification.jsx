import { useState, useEffect } from 'react';
import '../styles/Notification.css';

const Notification = ({ message, type, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) setTimeout(onClose, 300); // Allow for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`notification ${type} ${visible ? 'visible' : 'hidden'}`}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;