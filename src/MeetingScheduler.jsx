import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function MeetingScheduler({ roomAvailability }) {
  // Logic for meeting scheduling component
  console.log("roomAvailability", roomAvailability);
  const { openTime, closeTime } = roomAvailability || {};

  const [meetingDuration, setMeetingDuration] = useState(30);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [existingBookings, setExistingBookings] = useState([]);

  const isSlotBooked = (start, end) => {
    return existingBookings.some((booking) => {
      const bookingStart = new Date(`01/01/2000 ${booking.start}`);
      const bookingEnd = new Date(`01/01/2000 ${booking.end}`);
      return (
        (start >= bookingStart && start < bookingEnd) ||
        (end > bookingStart && end <= bookingEnd)
      );
    });
  };

  const generateAvailableTimeSlots = () => {
    const startTime = new Date(`01/01/2000 ${openTime}`);
    const endTime = new Date(`01/01/2000 ${closeTime}`);
    const timeSlots = [];

    while (startTime < endTime) {
      const slotStartTime = startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const slotEndTime = new Date(
        startTime.getTime() + meetingDuration * 60000
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      timeSlots.push({ start: slotStartTime, end: slotEndTime });

      startTime.setMinutes(startTime.getMinutes() + 10);
    }
    setAvailableTimeSlots(timeSlots);
  };

  const handleMeetingDurationChange = (e) =>
    setMeetingDuration(parseInt(e.target.value));

  const handleTimeSlotSelect = (time) =>
    setExistingBookings([
      ...existingBookings,
      {
        start: time.split(" - ")[0],
        end: time.split(" - ")[1],
      },
    ]);

  useEffect(() => {
    if (openTime && closeTime) {
      generateAvailableTimeSlots();
    }
  }, [roomAvailability, meetingDuration]);

  useEffect(() => {
    setExistingBookings([]);
  }, [roomAvailability]);

  return (
    <div>
      <h2>Meeting Scheduler</h2>
      <label htmlFor="meetingDuration" style={{ marginRight: "1rem" }}>
        Meeting Duration (minutes):
      </label>
      <select
        id="meetingDuration"
        value={meetingDuration}
        onChange={handleMeetingDurationChange}
      >
        {[...Array(12).keys()].map((num) => (
          <option key={num} value={(num + 1) * 10}>
            {(num + 1) * 10}
          </option>
        ))}
      </select>
      <h3>Existing Bookings:</h3>
      {existingBookings.length === 0 && <p>No bookings yet</p>}
      <ul
        style={{
          listStyle: "none",
        }}
      >
        {existingBookings
          .sort(
            (a, b) =>
              new Date(`01/01/2000 ${a.start}`) -
              new Date(`01/01/2000 ${b.start}`)
          )
          .map((booking, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              <div
                style={{
                  display: "inline-block",
                  marginRight: "1rem",
                  border: "1px solid green",
                  padding: "0.5rem",
                  color: "green",
                }}
              >{`${booking.start} - ${booking.end}`}</div>
              <button
                style={{ cursor: "pointer", color: "red", marginLeft: "1rem" }}
                onClick={() =>
                  setExistingBookings(
                    existingBookings.filter((_, i) => i !== index)
                  )
                }
              >
                ❌ remove
              </button>
            </li>
          ))}
      </ul>
      <h3>Available Time Slots:</h3>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.5rem",
          listStyle: "none",
        }}
      >
        {availableTimeSlots.map((slot, index) => (
          <li
            key={index}
            onClick={() => handleTimeSlotSelect(`${slot.start} - ${slot.end}`)}
            style={{
              // disable pointer events for booked slots
              pointerEvents: isSlotBooked(
                new Date(`01/01/2000 ${slot.start}`),
                new Date(`01/01/2000 ${slot.end}`)
              )
                ? "none"
                : "auto",
              backgroundColor:
                isSlotBooked(
                  new Date(`01/01/2000 ${slot.start}`),
                  new Date(`01/01/2000 ${slot.end}`)
                ) && "darkgrey",
            }}
            className="time-slot"
          >
            {`${slot.start} - ${slot.end}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeetingScheduler;
