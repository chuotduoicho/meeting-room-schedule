import { useState } from "react";
import RoomAvailabilityForm from "./RoomAvailabilityForm";
import MeetingScheduler from "./MeetingScheduler";
import "./App.css";

function App() {
  const [roomAvailability, setRoomAvailability] = useState({
    openTime: "",
    closeTime: "",
  });

  const isSelectingTime =
    roomAvailability.openTime && roomAvailability.closeTime;

  return (
    <div>
      <h1>Meeting Room Scheduler</h1>
      <RoomAvailabilityForm setRoomAvailability={setRoomAvailability} />
      {isSelectingTime ? (
        <MeetingScheduler roomAvailability={roomAvailability} />
      ) : (
        <p>Set room availability to schedule a meeting</p>
      )}
    </div>
  );
}

export default App;
