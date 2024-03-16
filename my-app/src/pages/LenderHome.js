import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";

function LenderHome() {
  const [name, setName] = useState("");
  const [cars, setCars] = useState([]);
  const { auth, handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");
    if (storedName && storedRole === "lender") {
      setName(storedName);
    } else {
      handleLogout();
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/lender/my_car", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        });
        const data = await response.json();

        if (response.status === 402) {
          handleLogout();
          navigate("/login");
        }
        setCars(data.car.map((car, index) => ({
          id: index + 1,
          title: car.Name,
          description: car.Model,
          imageUrl: "https://car-images.bauersecure.com/wp-images/3695/maserati-mc20-lead.jpg",
          license: car.License,
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: "25%", marginTop: "7%" }}>
        <h1 className="text-6xl text-bold bg-gradient-to-r from-sky-500 via-30% to-emerald-500 to-90% inline-block text-transparent bg-clip-text">
          สวัสดี, {name}
        </h1>
      </div>
      <YourCarsSection cars={cars} />
    </div>
  );
}

const YourCarsSection = ({ cars }) => {
  return (
    <div>
      <h1
        className="text-4xl text-bold"
        style={{ marginLeft: "25%", marginTop: "5%" }}
      >
        Your Cars
      </h1>
      <h1
        className="text-2xl text-bold text-gray-500"
        style={{ marginLeft: "25%", marginTop: "2%" }}
      >
        คุณมีรถที่ลงทะเบียนไว้แล้ว {cars.length} คัน
      </h1>

      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

const CarCard = ({ car }) => {
  return (
    <div
      className="pb-30"
      style={{ marginLeft: "25%", marginTop: "2%", marginRight: "20%" }}
    >
      <div className="h-48 w-full border-black border-2 flex pl-2 rounded-xl shadow-yellow-400 hover:shadow-2xl ">
        <div className="mt-2 mb-2 w-1/3">
          <img
            className="rounded-xl object-cover w-full h-full hover:scale-125 transition duration-500 cursor-pointer"
            src={car.imageUrl}
            alt="Car"
          />
        </div>
        <div className="mt-2 ml-6">
          <h1
            style={{
              textAlign: "left",
              fontWeight: "500",
              fontSize: "120%",
              paddingTop: "5%",
            }}
          >
            {car.title}
          </h1>
          <h1
            style={{
              textAlign: "left",
              fontWeight: "500",
              fontSize: "100%",
              paddingTop: "2%",
              color: "gray",
            }}
          >
            {car.description}
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{
                textAlign: "left",
                fontWeight: "500",
                fontSize: "100%",
                paddingTop: "2%",
                color: "gray",
                marginRight: "10px",
              }}
            >
              ทะเบียนรถ:
            </h1>
            <h1
              style={{
                textAlign: "left",
                fontWeight: "500",
                fontSize: "100%",
                paddingTop: "2%",
              }}
            >
              {car.license}
            </h1>
          </div>
          <Link to={`edit/${car.license}`}>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-400 hover:to-green-400 w-auto pl-10 pr-10 rounded-full mt-5 ">
            แก้ไขข้อมูล
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LenderHome;
