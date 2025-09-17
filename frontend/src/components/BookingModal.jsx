import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { bookTicket } from "../services/api";

export default function BookingModal({ show, train, onHide }) {
  const [passenger, setPassenger] = useState({ name: "", age: "", gender: "Male" });
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e?.preventDefault();
    setLoading(true);
    try {
      await bookTicket({ trainId: train._id || train.id, passenger });
      alert("Booked successfully");
      onHide();
    } catch (err) {
      alert(err.message || "Booking failed");
    } finally { setLoading(false); }
  }

  if (!train) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton><Modal.Title>Book: {train.name}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control className="mb-2" placeholder="Passenger name" value={passenger.name} onChange={e=>setPassenger({...passenger,name:e.target.value})} required />
          <Form.Control className="mb-2" type="number" placeholder="Age" value={passenger.age} onChange={e=>setPassenger({...passenger,age:e.target.value})} required />
          <Form.Select className="mb-2" value={passenger.gender} onChange={e=>setPassenger({...passenger,gender:e.target.value})}>
            <option>Male</option><option>Female</option><option>Other</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button type="submit" variant="primary" disabled={loading}>{loading ? "Booking..." : "Confirm Book"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
