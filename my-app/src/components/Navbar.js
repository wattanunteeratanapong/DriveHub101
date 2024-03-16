
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect , useContext } from 'react';
import { useAuth } from "../provider/AuthContext";

const Navbar = () => {
  const { auth ,handleLogout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpenReservation, setIsDropdownOpenReservation] = useState(false);
  const [isDropdownOpenHelp, setIsDropdownOpenHelp] = useState(false);
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);
  const dropdownRefReservation = useRef(null);
  const dropdownRefHelp = useRef(null);
  const dropdownRefUser = useRef(null);
  const buttonRefReservation = useRef(null);
  const buttonRefHelp = useRef(null);
  const buttonRefUser = useRef(null);
  const isFullScreen = window.innerHeight === window.screen.height;

  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedRole = localStorage.getItem('role');
  
    if (storedName && storedRole) {
      setName(storedName);
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpenReservation && dropdownRefReservation.current && buttonRefReservation.current) {
      const buttonRect = buttonRefReservation.current.getBoundingClientRect();
      dropdownRefReservation.current.style.top = `${buttonRect.bottom}px`;
      dropdownRefReservation.current.style.left = `${buttonRect.left}px`;
    }
  }, [isDropdownOpenReservation]);

  useEffect(() => {
    if (isDropdownOpenHelp && dropdownRefHelp.current && buttonRefHelp.current) {
      const buttonRect = buttonRefHelp.current.getBoundingClientRect();
      dropdownRefHelp.current.style.top = `${buttonRect.bottom}px`;
      dropdownRefHelp.current.style.left = `${buttonRect.left}px`;
    }
  }, [isDropdownOpenHelp]);

  useEffect(() => {
    if (isDropdownOpenUser && dropdownRefUser.current && buttonRefUser.current) {
      const buttonRect = buttonRefUser.current.getBoundingClientRect();
      dropdownRefUser.current.style.top = `${buttonRect.bottom}px`;
      dropdownRefUser.current.style.left = `${buttonRect.left}px`;
    }
  }, [isDropdownOpenUser]);

  const toggleDropdownReservation = () => {
    setIsDropdownOpenReservation(prevState => !prevState);
  };

  const toggleDropdownHelp = () => {
    setIsDropdownOpenHelp(prevState => !prevState);
  };

  const toggleDropdownUser = () => {
    setIsDropdownOpenUser(prevState => !prevState);
  };

  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center w-full ">
        <Link to="/" className="text-white font-bold " style={{marginRight:"20%"}}>DRIVEHUB</Link>
        <div>
        {auth ? (
  <div className="flex flex-col justify-center ">
    <div >

    <button
            ref={buttonRefUser}
            id="dropdownUser"
            onClick={toggleDropdownUser}
            className="text-white bg-transparent hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
          >
            <p >
            {name}</p>
            <svg
              className={`w-2.5 h-2.5 ms-3 transform ${isDropdownOpenUser ? 'rotate-180' : ''}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div
            ref={dropdownRefUser}
            id="dropdownUser"
            className={`absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${isDropdownOpenUser ? 'block' : 'hidden'}`}
          >
           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUser">
                    {role === 'customer'&& (
                      <>
                        <li>
                          <Link to="/reservations" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">รายการจอง</Link>
                        </li>
                        <li>
                          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">โปรไฟล์</Link>
                        </li>
                        <li>
                          <Link to="/" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ออกจากระบบ</Link>
                        </li>
                      </>
                    )}
                    {role === 'lender'&& (
                      <>
                        <li>
                          <Link to="/addcar" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">เพิ่มรถ</Link>
                        </li>
                        <li>
                          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">โปรไฟล์</Link>
                        </li>
                        <li>
                          <Link to="/" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ออกจากระบบ</Link>
                        </li>
                      </>
                      )}
                  </ul>
                  </div> 
    </div>
  </div>
) : (
  <div className="container mx-auto flex items-center w-full">
    <Link to="/register" className="text-white hover:bg-gray-500 hover:scale-110 rounded-lg text-sm px-5 py-2.5 text-right inline-flex items-center absolute" style={{right:'15%'}}>Register</Link>
    <Link to="/login" className="text-white hover:bg-gray-500 hover:scale-110 rounded-lg text-sm px-5 py-2.5 text-right inline-flex items-center ml-4 absolute" style={{right:'5%'}}>Login</Link>
  </div>
)}

        </div>
       
    
      </div>
      
    </nav>
  );
};

export default Navbar;

