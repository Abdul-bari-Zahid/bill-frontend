import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import UploadBill from "./Dashboard/UploadBill.jsx";
import BillOptimizer from "./Dashboard/BillOptimizer";
import BillAnalysis from "./Dashboard/BillAnalysis";
import MyBills from "./Dashboard/MyBills";
import Protect from "./protected/Protect.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
        />
        <Route
          path="/upload-bill"
          element={
            <Protect>
              <UploadBill />
            </Protect>
          }
        />
        <Route
          path="/bill-optimizer"
          element={
            <Protect>
              <BillOptimizer />
            </Protect>
          }
        />
        <Route
          path="/my-bills"
          element={
            <Protect>
              <MyBills />
            </Protect>
          }
        />
        <Route
          path="/bills/:id"
          element={
            <Protect>
              <BillAnalysis />
            </Protect>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
