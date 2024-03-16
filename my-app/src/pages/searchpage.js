import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

const SearchResultPage = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [availableCar, setAvailableCar] = useState("0");
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    const storedPickupLocation = localStorage.getItem("pickupLocation");
    if (storedPickupLocation) {
      setPickupLocation(storedPickupLocation);
    }

    const storedPickupDate = localStorage.getItem("pickupDate");
    if (storedPickupDate) {
      setPickupDate(dayjs(storedPickupDate));
    }

    const storedReturnDate = localStorage.getItem("returnDate");
    if (storedReturnDate) {
      setReturnDate(dayjs(storedReturnDate));
    }
  }, []);
  useEffect(() => {
    if (pickupLocation && pickupDate && returnDate) {
      handleSearch();
    }
  }, [pickupLocation, pickupDate, returnDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleSearch = () => {
    if (pickupLocation === "" || pickupDate === null || returnDate === null) {
      alert("Please fill in all fields");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/search_car", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              location: pickupLocation,
              pickupdate: formatDate(pickupDate),
              returndate: formatDate(returnDate),
            }),
          });

          const data = await response.json();

          setSearchResults(
            data.car.map((car, index) => ({
              id: index + 1,
              title: car.Name,
              description: car.Model,
              imageUrl:
                "https://car-images.bauersecure.com/wp-images/3695/maserati-mc20-lead.jpg",
              price: car.price,
              review: "Good",
              license: car.license,
            }))
          );

          setAvailableCar(data.car.length);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mt-8 ">
        <div
          className="mt-8 flex "
          style={{ marginLeft: "10%", marginTop: "2%", marginRight: "10%" }}
        >
          <div className="flex-auto w-64 bg-gray-100 p-4 rounded-lg">
            <label className="block mb-2 font-semibold">Pickup Location</label>
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
                Pickup and Return Date
              </label>
            </div>
            <div className="flex ">
              <div className="flex flex-col w-1/2 mr-3">
                {" "}
                <p>Pickup Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={pickupDate}
                    onChange={(text) => setPickupDate(text)}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col w-1/2 mr-3 ">
                {" "}
                <p>Return Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={returnDate}
                    onChange={(text) => setReturnDate(text)}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className="flex w-3 bg-transparent "></div>
        </div>
      </div>
      <div style={{ marginLeft: "10%", marginTop: "2%", marginRight: "10%" }}>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 focus:outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div
        className="pb-30"
        style={{ marginLeft: "25%", marginTop: "2%", marginRight: "20%" }}
      >
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold">
            Search Results: {availableCar} available cars
          </h1>
        </div>

        <div className="max-w-full mx-auto">
          <div>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result.id}
                  className="h-48 w-full border-black border-2 flex pl-2 rounded-xl shadow-yellow-400 hover:shadow-2xl mb-4"
                >
                  <div className="mt-2 mb-2 w-1/3">
                    <img
                      className="rounded-xl object-cover w-full h-full hover:scale-125 transition duration-500 cursor-pointer"
                      src={result.imageUrl}
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
                      {result.title}
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
                      {result.description}
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
                        Price:
                      </h1>
                      <h1
                        style={{
                          textAlign: "left",
                          fontWeight: "500",
                          fontSize: "100%",
                          paddingTop: "2%",
                        }}
                        className="text-black"
                      >
                        {result.price}
                      </h1>
                    </div>
                    <p
                      style={{
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "100%",
                        paddingTop: "2%",
                        color: "gray",
                        marginRight: "10px",
                      }}
                    >
                      Review: {result.review}
                    </p>

                    <Link to={`car/${result.license}`}>
                      <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-400 hover:to-green-400 w-auto pl-10 pr-10 rounded-full mt-5">
                        Car Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
