import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RatingForm from '../components/review';
import ReservationModal from '../components/ReservationModal';

const InformationPage = () => {
    const [carInfo, setCarInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCarInfo = async () => {
            try {
                const license = window.location.pathname.split('/').pop();
                const response = await fetch(`http://localhost:8000/search/car/${license}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch car information');
                }
                const data = await response.json();

                setCarInfo(data.car_detail[0]);
            } catch (error) {
                console.error('Error fetching car information:', error);
            }
        };

        fetchCarInfo();
    }, []);

    const handleReservation = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (!carInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 className="text-6xl font-bold">{carInfo.name}</h1>
                    <p className="text-gray-500 mb-5 text-2xl">{`รุ่น: ${carInfo.model}`}</p>
                    <img className=" rounded-lg scale-100 shadow-lg shadow-slate-300 border-black" style={{ marginRight: '10%', marginLeft: '10%', width: '50%' }}  src="https://car-images.bauersecure.com/wp-images/3695/maserati-mc20-lead.jpg" alt="Car" />
                </div>

                <div className="container mx-auto mt-10 ml-40 ">
                    <div className="w-1/6 flex text-left">
                        <div>

                            <div className='pl-40 w-80 ' >

                                <p className='text-gray-500 text-ml' >{`ประเภทรถ: `}</p>
                                <p className='text-2xl mb-7'>{`${carInfo.model}`}</p>
                                <div style={{ marginBottom: '10%' }}></div>
                                <p className='text-gray-500 text-ml'>จำนวนที่นั่ง:</p>
                                <p className='text-2xl mb-7'>{`${carInfo.seats}`}</p>
                                <div style={{ marginBottom: '10%' }}></div>
                                <p className='text-gray-500 text-ml'>{`ระบบเชื้อเพลิง:`}</p>
                                <p className='text-2xl mb-7'>{`${carInfo.fuel_system}`}</p>
                                <div style={{ marginBottom: '10%' }}></div>
                                <p className='text-gray-500 text-ml'>{`จำนวนประตู:`}</p>
                                <p className='text-2xl'>{`${carInfo.doors}`}</p>
                            </div>
                        </div>

                        <div className="w-3/6  ml-40  text-left">
                            <p className='text-gray-500 text-ml '>{`ระบบเกียร์: `}</p>
                            <p className='text-2xl mb-7'>{`${carInfo.transmission}`}</p>
                            <div style={{ marginBottom: '10%' }}></div>
                            <p className='text-gray-500 text-ml'>{`ประเภทเบาะ: `}</p>
                            <p className='text-2xl mb-7'>{`${carInfo.seat_type}`}</p>
                            <div style={{ marginBottom: '10%' }}></div>
                            <p className='text-gray-500 text-ml'>{`ความจุเครื่องยนต์: `}</p>
                            <p className='text-2xl mb-7'>{`${carInfo.engine_capacity}`}cc</p>
                        </div>
                        <div className='' style={{}}>
    <p className="mt-40 pl-10 text-red-600 text-6xl mb-5 ml-8">
        <span style={{ whiteSpace: 'nowrap' }}>฿</span>
        {carInfo.price}
    </p>

    <div className="modal-container text-center pl-10 " style={{ position: 'relative' }}>
        <button
            onClick={handleReservation}
            style={{
                padding: '8px 32px',
                paddingRight: '48px',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #4a90e2, #ff2d55)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                outline: 'none',
                marginLeft: '1.5rem',
             
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.25)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
            เช่าเลย !
        </button>
        {showModal && <ReservationModal handleClose={handleCloseModal} />}
    </div>
</div>

                    </div>
                </div>

                <div className="justify-center mt-8">
                    <div className="pl-12 items-center rounded-lg bg-gray-100 p-4">
                        <div>
                            <p className='text-2xl'>{`รีวิวร้านเช่า ${carInfo.owner}`}</p>
                        </div>

                    </div>
                    {/* <p className='text-5xl mt-8 ml-10' style={{marginLeft:'48%'}}>&#11088;{` ${carInfo.review}`}</p>  */}

                    <RatingForm />


                </div>
            </div>
        </div >
    );
};

export default InformationPage;
