import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {



    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const license = params.get('license');
    const locationName = params.get('location');
    const startDate = params.get('start_date');
    const endDate = params.get('end_date');

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h1 className="text-6xl font-bold">Confirmation Page</h1>
                </div>

                <div className="mt-10 flex justify-center">
                    <div className="w-2/3 bg-gray-100 rounded-lg p-8">
                        <div className="mb-6 flex items-center justify-center">
                            <img className="rounded-lg scale-100" style={{ marginRight: '10%', width: '30%' }} src="https://car-images.bauersecure.com/wp-images/3695/maserati-mc20-lead.jpg" alt="Car" />
                            <div>
                                <p className="text-xl text-gray-700">Confirm your reservation:</p>
                                <p>License: {license}</p>
                                <p>Location: {locationName}</p>
                                <p>Pickup Date: {startDate}</p>
                                <p>Return Date: {endDate}</p>
                            </div>
                        </div>

                        <div className="text-center mt-10"> {/* Added margin to the bottom */}
                            <p className="text-gray-700">Are you sure you want to confirm your reservation?</p>
                            
                            <Link
                                to={`/checkout?license=${license}&start_date=${startDate}&end_date=${endDate}`}
                                
                            ><button className="mt-8 px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:scale-105 transition-transform duration-300">
                                Confirm
                                </button>
                                
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
