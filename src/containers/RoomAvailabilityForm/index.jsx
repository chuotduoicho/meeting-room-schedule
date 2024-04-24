import { useState } from "react";

// eslint-disable-next-line react/prop-types
function RoomAvailabilityForm({ setRoomAvailability }) {
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const isInvalidTimeRange = openTime >= closeTime;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRoomAvailability({ openTime, closeTime });
  };

  return (
    <div className="availability-form-container">
      <form onSubmit={handleFormSubmit} className="availability-form">
        <label htmlFor="openTime">Open Time:</label>
        <input
          type="time"
          id="openTime"
          value={openTime}
          onChange={(e) => setOpenTime(e.target.value)}
          className="time-input"
        />
        <label htmlFor="closeTime">Close Time:</label>
        <input
          type="time"
          id="closeTime"
          value={closeTime}
          onChange={(e) => setCloseTime(e.target.value)}
          className="time-input"
        />
        <button type="submit" disabled={isInvalidTimeRange}>
          Set Availability
        </button>
      </form>
      <p style={{ color: "red" }}>
        {isInvalidTimeRange && "Close time must be later than open time"}
      </p>
    </div>
  );
}

export default RoomAvailabilityForm;
