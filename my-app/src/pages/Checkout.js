import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';

const CheckoutForm = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const license = params.get('license');
    const locationName = params.get('location');
    const startDate = params.get('start_date');
    const endDate = params.get('end_date');
    const startDateParts = startDate.split('/').map(Number);
    const endDateParts = endDate.split('/').map(Number);
    const [totalRentalCost, setTotalRentalCost] = useState(0);

    const start = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
    const end = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

    const differenceInMilliseconds = end - start;

    const differenceInDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;

    const token = localStorage.getItem('token');
    let deposit = 1000
    const [serial, setSerial] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [couponMessage, setCouponMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone_number: ""
    });
    const [carName, setCarName] = useState("");
    const [carPrice, setCarPrice] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [returnLocation, setReturnLocation] = useState("");
    const [final, setFinal] = useState("");
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/checkout_page?token=' + token + '&license=' + license);
                if (response.ok) {
                    const data = await response.json();
                    const userDetails = data.user_details.user_details;
                    setUserData(userDetails);
                    setCarName(data.car_name);
                    setCarPrice(data.price)
                    setPickupLocation(data.location);
                    setReturnLocation(data.location);
                    const rentalCost = parseInt(data.price) * differenceInDays;
                    setTotalRentalCost(rentalCost);
                    const finalAmount = rentalCost - discount + deposit;
                    setFinal(finalAmount);
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [token, license, differenceInDays, discount, deposit]);

    const handleCoupon = async (serial) => {
        console.log('Button clicked. Serial:', serial);
        try {
            const response = await fetch(`http://localhost:8000/get_discount?serial=${serial}`);
            if (response.ok) {
                const discountAmount = await response.json();
                setDiscount(discountAmount);
                console.log('Discount:', discountAmount);
                if (discountAmount !== 0) {
                    setCouponMessage("Coupon Used!");
                } else {
                    setCouponMessage("Coupon Invalid!");
                }
            } else {
                console.error('Failed to get discount:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to get discount:', error);
        }
    };

    return (
        <div>
            <Navbar />
            
            <div className="flex justify-center h-screen bg-slate-100">

                <div className="w-1/2 flex mt-3 ">
                    <div className="w-1/2">
                        <div className="flex flex-col bg-white px-3 mt-12 rounded-lg">
                            <div>
                                <h1 className="text-center p-3"> รายละเอียดรถ</h1>
                            </div>
                            <div className="flex mt-4 justify-start ">
                                <img
                                    src="https://car-images.bauersecure.com/wp-images/3695/maserati-mc20-lead.jpg"
                                    width="125px"
                                    height="125px"
                                    className="rounded-lg"
                                />
                                <div className="flex flex-col ml-5">
                                    <p>{carName}</p>
                                    <p>{license}</p>
                                </div>
                            </div>
                            <hr className="mt-5"></hr>
                        </div>
                        <div className="flex flex-col mt-5 bg-white px-3 rounded-lg">
                            <div>
                                <h1 className="text-center"> เวลารับรถคืนรถ </h1>
                            </div>
                            <div className="flex mt-4 justify-start ">
                                <img
                                    src="https://img2.pic.in.th/pic/Screenshot-2567-03-13-at-00.11.30.jpeg"
                                    width="100px"
                                    height="100px"
                                    className="rounded-lg"
                                />
                                <div className="ml-5">
                                    <p>รับรถ</p>
                                    <p>{pickupLocation}</p>
                                    <p>{startDate}</p>

                                    <p>คืนรถ</p>
                                    <p>{returnLocation}</p>
                                    <p>{endDate}</p>

                                </div>
                            </div>
                            <hr className="mt-5"></hr>
                        </div>

                        <div className="flex mt-5 bg-white px-3 rounded-lg">
                            <div>
                                <h1 className=""> ข้อมูลคนเช่า</h1>
                            </div>
                            <div className="flex  justify-start  ">
                                <div className="flex flex-col ml-5">
                                    <p>{userData.name}</p>
                                    <p>{userData.email}</p>
                                    <p>{userData.phone_number}</p>
                                </div>
                            </div>
                            <hr className="mt-5"></hr>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col mt-5 p-5">
                        <div className="bg-white rounded-lg text-center mt-2 mb-2">
                            <h1 className="mt-2">คูปองหรือโค้ดส่วนลด</h1>
                            {couponMessage && <p className={discount !== 0 ? "text-green-500" : "text-red-500"}>{couponMessage}</p>}
                            <form className="space-y-4  p-10">
                                <div>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="โค้ด"
                                        onChange={(e) => setSerial(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="mt-5 w-full px-6 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                                        onClick={() => handleCoupon(serial)}
                                    >
                                        ใช้โค้ด
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white rounded-lg text-center mt-3 mb-2 pb-5">
                            <h1 className="mt-2">สรุปรายละเอียด</h1>
                            <div className="flex flex-col">
                                {/* <h1 className="mt-2">ชำระในวันรับรถ</h1> */}
                                <div className="flex justify-between flex-row px-5 py-2">
                                    <h1 className="mt-2">ค่าเช่ารถ {differenceInDays} วัน</h1>
                                    <h1 className="mt-2">฿{totalRentalCost}</h1>
                                </div>
                                <div className="flex justify-between flex-row px-5 py-2">
                                    <h1 className="mt-2">ค่ารับส่ง</h1>
                                    <h1 className="mt-2">ฟรี</h1>
                                </div>
                            </div>
                            <div className="flex justify-between flex-row px-5 py-2">
                                <h1 className="mt-2 text-green-500">ส่วนลด</h1>
                                <h1 className="mt-2 text-green-500">฿{discount}</h1>
                            </div>

                            <div className="flex justify-between flex-row px-5 py-2">
                                <h1 className="mt-2 text-orange-500">ค่ามัดจำ</h1>
                                <h1 className="mt-2 text-orange-500">฿{deposit}</h1>
                            </div>
                            <div className="flex flex-col px-5">
                                <div
                                    className="flex justify-between flex-row px-5 py-2 border-2 border-emerald-500 rounded-lg cursor-pointer hover:bg-emerald-100"
                                    onClick={handleOpenModal}
                                >
                                    <h1 className="mt-2">ชำระตอนนี้</h1>
                                    <h1 className="mt-2">฿{final}</h1>
                                </div>
                                {showModal && <CheckoutModal closeModal={handleCloseModal} price={final} />}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;