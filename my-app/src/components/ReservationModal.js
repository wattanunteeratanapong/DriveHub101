import React from 'react';
import './ReservationModal.css';
import { Link } from 'react-router-dom';

export let pickupLocation = "";
export let pickupDate = null;
export let returnDate = null;

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const getPickupDetails = () => {
    const storedPickupLocation = localStorage.getItem("pickupLocation");
    if (storedPickupLocation) {
        pickupLocation = storedPickupLocation;
    }
    
    const storedPickupDate = localStorage.getItem("pickupDate");
    if (storedPickupDate) {
        pickupDate = new Date(storedPickupDate);
        console.log('pickupDate:', formatDate(pickupDate));
    }
    
    const storedReturnDate = localStorage.getItem("returnDate");
    if (storedReturnDate) {
        returnDate = new Date(storedReturnDate);
        console.log('returnDate:', formatDate(returnDate));
    }
};

const ReservationModal = ({ handleClose }) => {
    getPickupDetails();
    console.log('pickupLocation:', pickupLocation);

    // Constructing the URL with parameters
    const pathSegments = window.location.pathname.split('/');
    const licenseIndex = pathSegments.indexOf('car') + 1;
    const license = licenseIndex !== -1 && pathSegments[licenseIndex];
    const startDate = pickupDate ? formatDate(pickupDate) : '';
    const endDate = returnDate ? formatDate(returnDate) : '';
    const confirmationURL = `/confirmation?license=${license}&location=${pickupLocation}&start_date=${startDate}&end_date=${endDate}`;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <p>Pickup Location: {pickupLocation}</p>
                <p>Pickup Date: {pickupDate && formatDate(pickupDate)}</p>
                <p>Return Date: {returnDate && formatDate(returnDate)}</p>
                <Link to={confirmationURL}>
                    <button className="confirm-button">Confirm</button>
                </Link>
            </div>
        </div>
    );
};

export default ReservationModal;
