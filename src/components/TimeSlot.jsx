/* eslint-disable react/prop-types */
const TimeSlot = ({ slot, isBooked, onTimeSlotSelect }) => (
  <li
    onClick={() => !isBooked && onTimeSlotSelect(`${slot.start} - ${slot.end}`)}
    style={{
      pointerEvents: isBooked ? "none" : "auto",
      backgroundColor: isBooked && "darkgrey",
    }}
    className={`time-slot ${isBooked ? "booked" : ""}`}
  >
    {`${slot.start} - ${slot.end}`}
  </li>
);

export default TimeSlot;
