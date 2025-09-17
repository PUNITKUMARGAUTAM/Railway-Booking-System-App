import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function CreateTrainModal({ show, onHide, onCreate }) {
  const [form, setForm] = useState({ name: "", from: "", to: "", departure: "", arrival: "", seatsAvailable: 100 });
  const submit = (e) => { e.preventDefault(); onCreate(form); };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton><Modal.Title>Create Train</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control className="mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <Form.Control className="mb-2" placeholder="From" value={form.from} onChange={e=>setForm({...form,from:e.target.value})} required />
          <Form.Control className="mb-2" placeholder="To" value={form.to} onChange={e=>setForm({...form,to:e.target.value})} required />
          <Form.Control className="mb-2" placeholder="Departure" value={form.departure} onChange={e=>setForm({...form,departure:e.target.value})} required />
          <Form.Control className="mb-2" placeholder="Arrival" value={form.arrival} onChange={e=>setForm({...form,arrival:e.target.value})} required />
          <Form.Control className="mb-2" type="number" placeholder="Seats" value={form.seatsAvailable} onChange={e=>setForm({...form,seatsAvailable:+e.target.value})} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button type="submit" variant="primary">Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
