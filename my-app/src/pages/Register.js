import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // Check if passwords match
    if (
      name === "" ||
      phone_number === "" ||
      email === "" ||
      role === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      console.log("All fields are required");
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const data = {
      name: `${name}`,
      phone_Number: `${phone_number}`,
      email: `${email}`,
      role: `${role}`,
      password: `${password}`,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        console.log("User already exists");
        alert("User already exists");
        navigator("/login");
      }
      if (response.status === 402) {
        console.log("invalid input");
        console.log(data);
        alert("invalid input");
      } else if (response.status === 200) {
        console.log("User registered successfully");
        alert("User registered successfully");
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("role", responseData.role);
        navigator("/");
      }
    } catch (error) {
      console.error("There was an error registering the user:", error);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        opacity: 1,
      }}
    >
      <Navbar isOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />

      <div
        className={`container mx-auto mt-8 opacity-87 ${
          isNavbarOpen ? "z-0" : "z-10"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-center text-2xl font-bold">Register</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone_number"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone_number"
              type="phone_number"
              placeholder="Phone Number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Customer/Lender
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Select Role</option>
              <option>customer</option>
              <option>lender</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:bg-pink-600 hover:bg-gradient-to-r hover:from-indigo-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
