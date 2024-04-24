import { useState } from "react";
import MeetingScheduler from "./containers/MeetingScheduler";
import RoomAvailabilityForm from "./containers/RoomAvailabilityForm";
import "./App.css";

function App() {
  const [roomAvailability, setRoomAvailability] = useState({
    openTime: "",
    closeTime: "",
  });

  const isSelectingTime =
    roomAvailability.openTime && roomAvailability.closeTime;

  return (
    <>
      <h1>Meeting Room Scheduler</h1>
      <RoomAvailabilityForm setRoomAvailability={setRoomAvailability} />
      {isSelectingTime ? (
        <MeetingScheduler roomAvailability={roomAvailability} />
      ) : (
        <p>Set room availability to schedule a meeting</p>
      )}
    </>
  );
}

export default App;
