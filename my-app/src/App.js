import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/Nopage";
import AddCar from "./pages/AddCar";
import LenderHome from "./pages/LenderHome";
import CarDetail from "./pages/CarDetail";
import { useAuth} from "./provider/AuthContext"; 
import SearchResultPage from "./pages/searchpage";
import ConfirmationPage from "./pages/ConfirmationPage";
import CarEditPage from "./pages/CarEditPage";
import CheckoutForm from "./pages/Checkout";
import ReservationDetails from "./pages/ReservationDetail"

export default function App() {
  const { role } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home />} />

      {role === "lender" ? (
          <Route path="" element={<LenderHome />} />
        ) : <Route path="" element={<Home />} />}

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addcar" element={<AddCar />} />
        <Route path="confirmation" element={<ConfirmationPage />} />
        <Route path="search" element={<SearchResultPage />} />
        <Route path="search/car/:license" element={<CarDetail />} />
        <Route path="confirmation/:license/:start_date/:end_date" element={<ConfirmationPage />} />
        <Route path="edit/:license" element={<CarEditPage />} />
        <Route path="reservations" element={<ReservationDetails />} />
        <Route path="checkout" element={<CheckoutForm />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
