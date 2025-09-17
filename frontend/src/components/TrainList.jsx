import React, { useEffect, useState, useContext } from "react";
import { getTrains, createTrain } from "../services/api";
import TrainCard from "./TrainCard";
import CreateTrainModal from "./CreateTrainModel";
import BookingModal from "./BookingModal";
import { Button } from "react-bootstrap";
import "./TrainList.css";
import { AuthContext } from "../context/AuthContext";

export default function TrainList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [bookingTrain, setBookingTrain] = useState(null);
  const { user } = useContext(AuthContext);

  const fetch = async () => {
    setLoading(true);
    try { const data = await getTrains(); setTrains(data); } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = async (train) => {
    try {
      await createTrain(train);
      setShowCreate(false);
      fetch();
    } catch (e) { alert(e.message || "Create failed"); }
  };

  const onBook = (train) => {
    setBookingTrain(train);
  };

  return (
    <div className="trainlist-root">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Available Trains</h2>
        {user && <Button onClick={() => setShowCreate(true)}>Create Train</Button>}
      </div>

      {loading ? <div>Loading...</div> : trains.map(t => <TrainCard key={t._id || t.id} train={t} onBook={onBook} />)}

      <CreateTrainModal show={showCreate} onHide={() => setShowCreate(false)} onCreate={handleCreate} />

      <BookingModal show={!!bookingTrain} train={bookingTrain} onHide={() => setBookingTrain(null)} />
    </div>
  );
}
