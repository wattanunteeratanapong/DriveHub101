import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const ReservationDetail = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/get_reservation?token=" + localStorage.getItem("token"), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                const reservationsArray = Object.values(data.reservations.Reservations);
                setReservations(reservationsArray);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="w-full max-w-screen-lg mx-auto">
                <div className="flex justify-center font-semibold text-3xl mt-16 mb-5">
                    <h1>Reservation Details</h1>
                </div>

                {reservations.length > 0 ? (
                    <div className="flex justify-center flex-col">
                        {reservations.map((reservation, index) => (
                            <div key={index} className="flex justify-center  ">
                                <div className="flex flex-col rounded-lg p-4 mt-5 mb-4 border-black border-2 hover:shadow-2xl">
                                    <div className="flex mt-2 justify-start items-center">
                                        <div className="w-1/3 overflow-hidden rounded-lg mr-4">
                                            <img
                                                src="https://car-images.bauersecure.com/wp-images/3695/maserati-mc20-lead.jpg"
                                                alt="Car"
                                                className="w-full h-auto object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex flex-col w-2/3">
                                            <p className="font-medium text-xl">License: {reservation.License}</p>
                                            <p className="text-slate-500">Amount: ฿{reservation.Amount}</p>
                                            <p className="text-green-500">Location: {reservation.Location}</p>
                                            <p>Start Date: {reservation["Start Date"]}</p>
                                            <p>End Date: {reservation["End Date"]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="flex justify-center h-1/2 w-1/2 bg-slate-100 rounded-lg p-8">
                            <div className="flex flex-col">
                                <h1 className="text-2xl mt-5">No reservations found</h1>
                                <Link to="/" className="bg-blue-500 rounded-lg text-xl text-white font-bold py-2 px-4 mt-5 flex justify-center">Rent Now</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReservationDetail;
