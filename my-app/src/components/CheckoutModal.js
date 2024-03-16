import React, { useState } from 'react';
import './CheckoutModal.css';
import { useLocation } from 'react-router-dom';

const CheckoutModal = ({ closeModal, price }) => {
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const license = params.get('license');
    const startDate = params.get('start_date');
    const endDate = params.get('end_date');
    const token = localStorage.getItem('token');

    const handleConfirmation = async () => {
        console.log("TEST")
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/make_reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    license,
                    start_date: startDate,
                    end_date: endDate
                })
            });
            if (response.ok) {
                console.log('Reservation confirmed successfully');
                window.location.href = '/reservations';
            } else {
                console.error('Failed to confirm reservation:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to confirm reservation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png?20200615212723" alt="QR" className="qrcode" />
                <p className="price">Total Amount: {price}</p>
                <button className="confirm-button" onClick={handleConfirmation} disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Paid'}
                </button>
            </div>
        </div>
    );
};

export default CheckoutModal;
