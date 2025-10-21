import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { bookTicket } from "../services/api";
import { toast } from 'react-toastify';

export default function BookingModal({ show, trainScheduleOrTrain, onHide, refresh }) {
  // trainScheduleOrTrain expected: { train, schedule } OR train object
  const [passenger, setPassenger] = useState({ name: "", age: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      // minimal seat selection example: auto select first available seat from schedule
      const scheduleId = trainScheduleOrTrain?.schedule?._id || trainScheduleOrTrain?.scheduleId;
      if(!scheduleId) throw new Error("Schedule not selected");

      // for demo pick first available seat:
      const seats = (trainScheduleOrTrain.schedule.seats || []).filter(s => !s.isBooked).slice(0,1).map(s => ({
        seatNumber: s.seatNumber,
        coach: s.coach,
        class: s.class,
        price: s.price
      }));
      if (seats.length === 0) throw new Error("No seats available");

      const payload = { scheduleId, seats, passenger };
      const booking = await bookTicket(payload);
      toast.success("Booking successful");
      onHide();
      if(refresh) refresh();
    } catch (err) {
      toast.error(err?.message || "Booking failed");
    } finally { setLoading(false); }
  };

  if(!trainScheduleOrTrain) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton><Modal.Title>Book Ticket</Modal.Title></Modal.Header>
        <Modal.Body>
          <div><strong>Train:</strong> {trainScheduleOrTrain.train?.name || trainScheduleOrTrain.trainName}</div>
          <Form.Group className="mb-2">
            <Form.Label>Passenger Name</Form.Label>
            <Form.Control value={passenger.name} onChange={e=>setPassenger({...passenger,name:e.target.value})} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Age</Form.Label>
            <Form.Control value={passenger.age} onChange={e=>setPassenger({...passenger,age:e.target.value})} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control value={passenger.phone} onChange={e=>setPassenger({...passenger,phone:e.target.value})} required/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button type="submit" variant="primary" disabled={loading}>{loading ? "Booking..." : "Book"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}




// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { bookTicket } from "../services/api";

// export default function BookingModal({ show, train, onHide }) {
//   const [passenger, setPassenger] = useState({ name: "", age: "", gender: "Male" });
//   const [loading, setLoading] = useState(false);

//   async function submit(e) {
//     e?.preventDefault();
//     setLoading(true);
//     try {
//       await bookTicket({ trainId: train._id || train.id, passenger });
//       alert("Booked successfully");
//       onHide();
//     } catch (err) {
//       alert(err.message || "Booking failed");
//     } finally { setLoading(false); }
//   }

//   if (!train) return null;

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Form onSubmit={submit}>
//         <Modal.Header closeButton><Modal.Title>Book: {train.name}</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <Form.Control className="mb-2" placeholder="Passenger name" value={passenger.name} onChange={e=>setPassenger({...passenger,name:e.target.value})} required />
//           <Form.Control className="mb-2" type="number" placeholder="Age" value={passenger.age} onChange={e=>setPassenger({...passenger,age:e.target.value})} required />
//           <Form.Select className="mb-2" value={passenger.gender} onChange={e=>setPassenger({...passenger,gender:e.target.value})}>
//             <option>Male</option><option>Female</option><option>Other</option>
//           </Form.Select>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onHide}>Close</Button>
//           <Button type="submit" variant="primary" disabled={loading}>{loading ? "Booking..." : "Confirm Book"}</Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// }
