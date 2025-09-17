import React, { useEffect, useState } from "react";
import { getBookings, cancelBooking } from "../services/api";
import { Table, Button } from "react-bootstrap";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  async function fetch() {
    try {
      const b = await getBookings();
      setBookings(b || []);
    } catch (e) { console.error(e); }
  }
  useEffect(() => { fetch(); }, []);

  async function handleCancel(id) {
    if (!window.confirm("Cancel booking?")) return;
    try {
      await cancelBooking(id);
      fetch();
    } catch (e) { alert(e.message || "Failed"); }
  }

  return (
    <div>
      <h3>My Bookings</h3>
      <Table>
        <thead><tr><th>Train</th><th>Passenger</th><th>Action</th></tr></thead>
        <tbody>
          {bookings.length === 0 ? <tr><td colSpan="3">No bookings</td></tr> :
            bookings.map(b => (
              <tr key={b._id || b.id}>
                <td>{b.trainName || b.train?.name}</td>
                <td>{b.passenger?.name}</td>
                <td><Button variant="danger" size="sm" onClick={()=>handleCancel(b._id || b.id)}>Cancel</Button></td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
