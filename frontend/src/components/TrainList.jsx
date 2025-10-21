import React, { useEffect, useState, useContext } from "react";
import { getTrains, createTrain } from "../services/api";
import TrainCard from "./TrainCard";
import CreateTrainModal from "./CreateTrainModel";
import BookingModal from "./BookingModal";
import { Button } from "react-bootstrap";
import "./TrainList.css";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const BASE = "http://localhost:5000";

export default function TrainList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [bookingTrain, setBookingTrain] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchTrains = async () => {
    setLoading(true);
    try {
      const data = await getTrains();
      setTrains(data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load trains");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const handleCreate = async (train) => {
    try {
      await createTrain(train);
      setShowCreate(false);
      fetchTrains();
    } catch (e) {
      toast.error(e.message || "Create failed");
    }
  };

  const onBook = async (train) => {
    try {
      const res = await fetch(`${BASE}/api/trains/schedule/${train._id}`);
      if (!res.ok) throw new Error("Request failed");
      const sched = await res.json();
      setBookingTrain({ train, schedule: sched });
    } catch (e) {
      toast.error("Failed to fetch schedule");
    }
  };

  return (
    <div className="trainlist-root">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Available Trains</h2>
        {user?.role === "admin" && (
          <Button onClick={() => setShowCreate(true)}>Create Train</Button>
        )}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="train-cards">
          {trains.map((t) => (
            <TrainCard
              key={t._id || t.id}
              train={t}
              onBook={user?.role === "user" ? onBook : null}
            />
          ))}
        </div>
      )}

      <CreateTrainModal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        onCreate={handleCreate}
      />

      <BookingModal
        show={!!bookingTrain}
        train={bookingTrain}
        onHide={() => setBookingTrain(null)}
      />
    </div>
  );
}



// import React, { useEffect, useState, useContext } from "react";
// import { getTrains, createTrain } from "../services/api";
// import TrainCard from "./TrainCard";
// import CreateTrainModal from "./CreateTrainModel";
// import BookingModal from "./BookingModal";
// import { Button } from "react-bootstrap";
// import "./TrainList.css";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// // API base URL
// const BASE = "http://localhost:5000"; // अपनी backend URL डालें

// export default function TrainList() {
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showCreate, setShowCreate] = useState(false);
//   const [bookingTrain, setBookingTrain] = useState(null);
//   const { user } = useContext(AuthContext);

//   const fetchTrains = async () => {
//     setLoading(true);
//     try {
//       const data = await getTrains();
//       setTrains(data);
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to load trains");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTrains();
//   }, []);

//   const handleCreate = async (train) => {
//     try {
//       await createTrain(train);
//       setShowCreate(false);
//       fetchTrains();
//     } catch (e) {
//       toast.error(e.message || "Create failed");
//     }
//   };

//   const onBook = async (train) => {
//     try {
//       const res = await fetch(`${BASE}/api/trains/schedule/${train._id}`);
//       if (!res.ok) throw new Error("Request failed");
//       const sched = await res.json();
//       setBookingTrain({ train, schedule: sched });
//     } catch (e) {
//       toast.error("Failed to fetch schedule");
//     }
//   };

//   return (
//     <div className="trainlist-root">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Available Trains</h2>
//         {user && <Button onClick={() => setShowCreate(true)}>Create Train</Button>}
//       </div>

//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="train-cards">
//           {trains.map((t) => (
//             <TrainCard key={t._id || t.id} train={t} onBook={onBook} />
//           ))}
//         </div>
//       )}

//       <CreateTrainModal
//         show={showCreate}
//         onHide={() => setShowCreate(false)}
//         onCreate={handleCreate}
//       />

//       <BookingModal
//         show={!!bookingTrain}
//         train={bookingTrain}
//         onHide={() => setBookingTrain(null)}
//       />
//     </div>
//   );
// }
