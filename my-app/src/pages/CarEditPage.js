import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";

const EditCar = () => {
  const { auth, handleLogout, role } = useAuth(); // ดึงข้อมูลบทบาทของผู้ใช้จาก Context
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [price, setPrice] = useState("");

  const [carType, setCarType] = useState("");
  const [transmission, setTransmission] = useState("");

  const [seat, setSeat] = useState("");
  const [fuelSystem, setfuelSystem] = useState("");
  const [door, setDoor] = useState("");
  const [seatType, setSeatType] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");

  const license = window.location.pathname.split('/').pop();
  
  const handleSubmitform1 = async (e) => {
    e.preventDefault();

    const storage_name = localStorage.getItem("name");
    const storage_token = localStorage.getItem("token");

    const carData = {
      name: `${name}`,
      model: `${model}`,
      licensePlate: `${licensePlate}`,
      deliveryArea: `${deliveryArea}`,
      price: `${price}`,
      carType: `${carType}`,
      transmission: `${transmission}`,
      seat: `${seat}`,
      seatType: `${seatType}`,
      fuelSystem: `${fuelSystem}`,
      engineCapacity: `${engineCapacity}`,
      door: `${door}`,
      owner: `${storage_name}`,
      token: `${storage_token}`,
    };

    if (
      name === "" ||
      model === "" ||
      licensePlate === "" ||
      price === "" ||
      carType === "" ||
      transmission === "" ||
      seat === "" ||
      seatType === "" ||
      fuelSystem === "" ||
      engineCapacity === "" ||
      door === "" ||
      (deliveryArea === "" && deliveryArea !== "เลือกพื้นที่")
    ) {
      alert("Please fill in all fields");
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/lender/edit/${license}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData)
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 401) {
      console.log("You are not a lender");
      alert("You are not a lender");
      navigate("/home");
    }
    if (response.status === 402) {
      console.log("Token is invalid");
      alert("Token is invalid");
      handleLogout();
      navigate("/");
    }

    if (response.status === 200) {
      console.log("Car added successfully");
      alert("Car added successfully");

      // navigate("/");
    }

  };

  useEffect(() => {
    const fetchCarInfo = async () => {
      try { // Extract license from URL
            const response = await fetch(`http://localhost:8000/search/car/${license}`);
            if (!response.ok) {
                throw new Error('Failed to fetch car information');
            }
            const data = await response.json();
            console.log(data.car_detail[0]);
            setName(data.car_detail[0].name);
            setModel(data.car_detail[0].model);
            setPrice(data.car_detail[0].price);
            setLicensePlate(data.car_detail[0].license_plate);
            setDeliveryArea(data.car_detail[0].delivery_area);
            setCarType(data.car_detail[0].car_type);
            setSeat(data.car_detail[0].seats);
            setfuelSystem(data.car_detail[0].fuel_system);
            setDoor(data.car_detail[0].doors);
            setTransmission(data.car_detail[0].transmission);
            setSeatType(data.car_detail[0].seat_type);
            setEngineCapacity(data.car_detail[0].engine_capacity);

          } catch (error) {
              console.error('Error fetching car information:', error);
          }
    };
    console.log(licensePlate);
    fetchCarInfo();
}, []);




  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        opacity: 1,
      }}
    >
      <Navbar />
      <div style={{ marginTop: "5%", marginLeft: "20%" }}>
        <Link to="/" className="text-blue-500 hover:text-violet-600">
          Back to Homepage
        </Link>
      </div>
      <div className="h-full">
        <div
          className="flex items-center justify-center "
          style={{
            marginTop: "5%",
            marginLeft: "20%",
            marginBottom: "5%",
            marginRight: "50%",
          }}
        >
          <h1 className="text-4xl font-bold text-black w-full">
            เพิ่มรถให้เช่า
          </h1>
        </div>
      </div>
      <div className="flex " style={{ marginLeft: "20%" }}>
        <AddPicture />
        <div className="flex" style={{ marginLeft: "1%" }}>
          <CarForm_1
            setName={setName}
            name={name}
            setModel={setModel}
            model={model}
            setPrice={setPrice}
            price={price}
            setLicensePlate={setLicensePlate}
            licensePlate={licensePlate}
            setDeliveryArea={setDeliveryArea}
            deliveryArea={deliveryArea}
          />
        </div>
      </div>
      <div className="flex" style={{ marginTop: "5%", marginLeft: "20%" }}>
        <CarForm_2
          setCarType={setCarType}
          carType={carType}
          setSeat={setSeat}
          seat={seat}
          setfuelSystem={setfuelSystem}
          fuelSystem={fuelSystem}
          setDoor={setDoor}
          door={door}
        />
        <CarForm_3
          handleSubmitform1={handleSubmitform1}
          setTransmission={setTransmission}
          transmission={transmission}
          setSeatType={setSeatType}
          seatType={seatType}
          setEngineCapacity={setEngineCapacity}
          engineCapacity={engineCapacity}
        />
      </div>
    </div>
  );
};

const AddPicture = () => {
  const [file, setFile] = useState();

  function handleFileChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      {file ? (
        <div
          className="bg-gray-300 rounded-lg flex flex-col AddPicture"
          style={{
            width: "400px",
            maxWidth: "80vw",
            height: "400px",
            padding: "15px",
          }}
        >
          <div className="w-full h-full border-dashed border-2 border-black rounded-lg flex flex-col items-center justify-center">
            <img
              src={file}
              alt="Uploaded"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      ) : (
        <label
          htmlFor="fileInput"
          className="bg-gray-300 rounded-lg flex flex-col AddPicture"
          style={{
            width: "400px",
            maxWidth: "80vw",
            height: "400px",
            padding: "15px",
            cursor: "pointer",
          }}
        >
          <div className="w-full h-full border-dashed border-2 border-black rounded-lg flex flex-col items-center justify-center">
            <h1 className="text-black text-center text-6xl">+</h1>
            <br />
            <p className="text-black text-center">*อัพโหลด</p>
            <p className="text-black text-center">อย่างน้อย 1 รูป</p>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </label>
      )}
    </div>
  );
};

const CarForm_1 = ({
  setName,
  name,
  setModel,
  model,
  setPrice,
  price,
  setLicensePlate,
  licensePlate,
  setDeliveryArea,
  deliveryArea,
}) => {
  return (
    <div className="ml-4">
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-black font-bold mb-2">
            ชื่อ
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-black font-bold mb-2">
            รุ่น
          </label>
          <input
            type="text"
            id="model"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="licensePlate"
            className="block text-black font-bold mb-2"
          >
            ทะเบียนรถ
          </label>
          <input
            type="text"
            id="licensePlate"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />
        </div>
        <label
          htmlFor="licensePlate"
          className="block text-black font-bold mb-2"
        >
          พื้นที่รับ-ส่ง
        </label>
        <select
          id="deliveryArea"
          value={deliveryArea}
          onChange={(e) => setDeliveryArea(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        >
          <option value="">เลือกพื้นที่</option>
          <option>พระเทพ</option>
          <option>ECC</option>
          <option>ตึกโกล</option>
        </select>

        <div className="mb-4 mt-4">
          <label htmlFor="price" className="block text-black font-bold mb-2">
            ราคาเช่าต่อวัน
          </label>
          <input
            type="text"
            id="licensePlate"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

const CarForm_2 = ({
  setCarType,
  carType,
  setSeat,
  seat,
  setfuelSystem,
  fuelSystem,
  setDoor,
  door,
}) => {
  return (
    <div className="ml-4">
      <h1 className="text-2xl font-bold">รายละเอียด</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-black font-bold mb-2">
            ประเภทรถ
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-black font-bold mb-2">
            จำนวนที่นั่ง
          </label>
          <input
            type="text"
            id="model"
            className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="licensePlate"
            className="block text-black font-bold mb-2"
          >
            ระบบเชื้อเพลิง
          </label>
          <input
            type="text"
            id="licensePlate"
            className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={fuelSystem}
            onChange={(e) => setfuelSystem(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="licensePlate"
            className="block text-black font-bold mb-2"
          >
            จำนวนประตู
          </label>
          <input
            type="text"
            id="licensePlate"
            className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={door}
            onChange={(e) => setDoor(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

const CarForm_3 = ({
  handleSubmitform1,
  setTransmission,
  transmission,
  setSeatType,
  seatType,
  setEngineCapacity,
  engineCapacity,
}) => {
  return (
    <div className="ml-4">
      <h1 className="text-2xl font-bold text-white"> .</h1>
      <form onSubmit={handleSubmitform1}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-black font-bold mb-2">
            ระบบเกียร์
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-black font-bold mb-2">
            ประเภทเบาะ
          </label>
          <input
            type="text"
            id="model"
            className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={seatType}
            onChange={(e) => setSeatType(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="licensePlate"
            className="block text-black font-bold mb-2"
          >
            ความจุเครื่องยนต์
          </label>
          <input
            type="text"
            id="licensePlate"
            className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={engineCapacity}
            onChange={(e) => setEngineCapacity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="licensePlate" className="block text-transparent mb-2">
            SUBMIT
          </label>
          <button
            type="sumbit"
            className="w-full px-7 py-2 text-white border border-gray-300 rounded-full bg-gradient-to-r from-blue-500 to-pink-400 focus:outline-none focus:border-indigo-500"
          >
            แก้ไข
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default EditCar;

