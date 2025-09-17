import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h3>Dashboard</h3>
      <p>Welcome, {user?.name || user?.email}</p>
      <p><Link to="/bookings">View my bookings</Link></p>
    </div>
  );
}
