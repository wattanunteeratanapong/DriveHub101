import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleSearch() {
    if (pickupLocation === "" || pickupDate === "" || returnDate === "") {
        alert("Please fill in all fields");
    } else {
        localStorage.setItem("pickupLocation", pickupLocation);
        localStorage.setItem("pickupDate", pickupDate);
        localStorage.setItem("returnDate", returnDate);

        console.log(pickupLocation);
        console.log(pickupDate);
        console.log(returnDate);
        navigate("/search");
    }
  }

    

  const bgImgUrl = process.env.PUBLIC_URL + "/pictures/bg-homepage.jpg";

  return (
    <div
      style={{
        backgroundImage: `url(${bgImgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        opacity: 1, // Adjust the opacity value (0.5) for the desired opacity
      }}
    >
      <Navbar />
      <TabsForRent
        handleSearch={handleSearch}
        pickupLocation={pickupLocation}
        setPickupLocation={setPickupLocation}
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
      />
      <HowGood />
    </div>
  );
}

const TabsForRent = ({ handleSearch , pickupLocation , setPickupLocation, pickupDate ,setPickupDate , setReturnDate,returnDate}) => {
  const [activeTab, setActiveTab] = useState("rentOnYourOwn");

  return (
    <div className="container mx-auto px-30 text-center py-10">
      <h1 className="text-3xl font-bold text-white">
        ค้นหารถเช่าราคาถูกที่สุด
      </h1>
      <p className="text-white text-overline">
        จาก 500 กว่าบริษัทรถเช่าทั่วประเทศ
      </p>
      <div className="container mx-auto px-6 text-center py-7 bg-transparent rounded-lg"></div>
      <div className="container mx-auto px-6  text-center py-5 bg-white rounded-lg">
        <div className="flex justify-left space-x-8">
          <button
            className={`text-lg font-semibold  ${
              activeTab === "rentOnYourOwn"
                ? "text-blue-500 scale-110"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("rentOnYourOwn")}
          >
            เช่ารถขับเอง
          </button>
        </div>

        {activeTab === "rentOnYourOwn" && (
          <div className="mt-8 ">
            <div className="mt-8 flex ">
              <div className="flex-auto w-64 bg-gray-100 p-4 rounded-lg">
                <label className="block mb-2 font-semibold">จุดรับ-คืนรถ</label>
                <select
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full mt-6 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                >
                  <option>select</option>
                  <option>พระเทพ</option>
                  <option>ECC</option>
                  <option>ตึกโหล</option>
                </select>
              </div>

              <div className="flex w-3 bg-transparent "></div>
              <div className="flex-auto w-64 bg-gray-100 p-4 rounded-lg flex flex-col">
                <div>
                  <label className="block mb-2 font-semibold">
                    วัน-เวลารับรถคืนรถ
                  </label>
                </div>
                <div className="flex ">
                  <div className="flex flex-col w-1/2 mr-3">
                    {" "}
                    <p>วันรับรถ</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={pickupDate}
                        onChange={(date) => setPickupDate(date)}
                      />
                    </LocalizationProvider>
                  </div>

                  <div className="flex flex-col w-1/2 mr-3 ">
                    {" "}
                    <p>วันคืนรถ</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={returnDate}
                        onChange={(date) => setReturnDate(date)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>

              <div className="flex w-3 bg-transparent "></div>
            </div>
            <button
              onClick={handleSearch}
              className=" bg-blue-500 mt-4 w-full h-16 rounded-lg text-white text-cente hover:shadow-lg hover:bg-blue-400"
            >
              ค้นหารถเช่า
            </button>
          </div>
        )}

        {activeTab === "rentWithDriver" && (
          <div className="mt-8 ">
            <div className="mt-8 flex ">
              <div className="flex-auto w-64 bg-gray-100 p-4 rounded-lg">
                <label className="block mb-2 font-semibold">
                  จุดรับผู้โดยสาร
                </label>
                <select
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full mt-6 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                >
                    <option>select</option>
                  <option>พระเทพ</option>
                  <option>ECC</option>
                  <option>ตึกโหล</option>
                </select>
              </div>

              <div className="flex w-3 bg-transparent "></div>
              <div className="flex-auto w-64 bg-gray-100 p-4 rounded-lg flex flex-col">
                <div>
                  <label className="block mb-2 font-semibold">
                    วัน-เวลารับรถคืนรถ
                  </label>
                </div>
                <div className="flex ">
                  <div className="flex flex-col w-1/2 mr-3">
                    {" "}
                    <p>วันรับรถ</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </div>

                  <div className="flex flex-col w-1/2 mr-3">
                    {" "}
                    <p>วันกลับ</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>

              <div className="flex w-3 bg-transparent "></div>
            </div>
            <button
              onClick={handleSearch}
              className=" bg-blue-500 mt-4 w-full h-16 rounded-lg text-white text-center"
            >
              {" "}
              ค้นหารถเช่า
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const HowGood = () => {
  return (
    <div
      className="container mt-72 pt-72 pb-72 mx-auto bg-white w-100"
      style={{
        maxWidth: "1920px",
        width: "100%",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "1920px", width: "100%", height: "10vh" }}></div>
      <h3 className="text-3xl font-bold text-black mx-10 mb-4">
        เช่ารถกับไดร์ฟฮับ
      </h3>
      <p className="text-xl font-bold text-gray-500 mx-10 mb-8">
        เช่ารถกับเราดียังไง
      </p>
      <div className="flex justify-between align-middle w-full max-w-4xl flex-row">
        <div className="w-1/4 mx-4 p-4 text-center">
          <img
            src="pictures/cancelled.png"
            width="200"
            height="200"
            className="mb-5"
            alt="Cancel center"
          />
          <h4 className="text-xl font-bold text-center">ยกเลิกฟรี</h4>
          <p>แจ้งภายใน 72 ชั่วโมง</p>
        </div>

        <div className="w-1/4 mx-4  p-4 ">
          <img
            src="pictures/no-credit-card.png"
            width="200"
            height="200"
            className="mb-5"
            alt="Cancel"
          />
          <h4 className="text-xl font-bold text-center">
            ไม่มีบัตรเครดิตก็เช่าได้
          </h4>
          <p className="text-center">แค่ใช้เอกสารยืนยันเท่านั้น</p>
        </div>
        <div className="w-1/4 mx-4  p-4  text-center">
          <img
            src="pictures\call-center.png"
            width="200"
            height="200"
            className="mb-5"
            alt="No credit Card"
          />
          <h4 className="text-xl font-bold text-center">เจ้าหน้าที่ดูแล</h4>
          <p className="text-center">มีเจ้าหน้าที่ดูแลตลอดการเช่า</p>
        </div>
        <div className="w-1/4 mx-4  p-4  text-center">
          <img
            src="pictures\price-tags.png"
            width="200"
            height="200"
            className="mb-5"
            alt="Price Compare"
          />
          <h4 className="text-xl font-bold text-center">เปรียบเทียบราคา</h4>
          <p className="text-center">เทียบราคารถเช่าทุกบริษัทได้ทันที</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
