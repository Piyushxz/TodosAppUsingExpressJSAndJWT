import { useEffect, useState } from 'react';

const Modal = ({ onClose }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsFading(true);
        }, 2000);

        const closeTimer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    return (
        <>
           
            <div className={`modal-box ${isFading ? 'fade-out' : ''}`}>
                <h4>Signed Up Successfully</h4>
            </div>
        </>
    );
};

export default Modal;
