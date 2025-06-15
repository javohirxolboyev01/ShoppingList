import React from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./pages/Dashboard/Profile/Profile";
import Group from "./pages/Dashboard/Group/Group";
import Layout from "./components/Layout/Layout";
import Dashboards from "./pages/Dashboard/Dashboards";
import Navbar from "./components/Navabar/Navbar";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
    {!isAuthPage && <Navbar />} {/* Navbar faqat login/register bo'lmagan sahifalarda chiqadi */}
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboards />}>
            <Route path="profile" element={<Profile />} />
            <Route path="groups/:_id" element={<Group />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
