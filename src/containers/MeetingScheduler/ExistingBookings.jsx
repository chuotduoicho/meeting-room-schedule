import { parseTime } from "../../utils";

/* eslint-disable react/prop-types */
const ExistingBookings = ({
  existingBookings = [],
  setExistingBookings = () => {},
}) => {
  const handleRemoveBooking = (index) =>
    setExistingBookings(existingBookings.filter((_, i) => i !== index));

  return (
    <div className="existing-booking-container">
      <h3>Existing Bookings:</h3>
      {existingBookings.length === 0 && <p>No bookings yet</p>}
      <ul className="existing-bookings-box">
        {existingBookings
          .sort((a, b) => parseTime(a.start) - parseTime(b.start))
          .map((booking, index) => (
            <li key={index} className="existing-booking">
              <div className="booking-time">{`${booking.start} - ${booking.end}`}</div>
              <button
                className="remove-booking-button"
                onClick={() => handleRemoveBooking(index)}
              >
                ❌
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExistingBookings;
