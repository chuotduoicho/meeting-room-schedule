import { useEffect, useState } from "react";
import AvailableTimeSlots from "./AvailableTimeSlots";
import ExistingBookings from "./ExistingBookings";
import { getTimeSlots, parseTime } from "../../utils";

// eslint-disable-next-line react/prop-types
function MeetingScheduler({ roomAvailability }) {
  const { openTime, closeTime } = roomAvailability || {};

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [existingBookings, setExistingBookings] = useState([]);

  const generateAvailableTimeSlots = (duration = 30) => {
    const timeSlots = getTimeSlots(
      parseTime(openTime),
      parseTime(closeTime),
      duration
    );
    setAvailableTimeSlots(timeSlots);
  };

  const handleTimeSlotSelect = (time) =>
    setExistingBookings([
      ...existingBookings,
      {
        start: time.split(" - ")[0],
        end: time.split(" - ")[1],
      },
    ]);

  useEffect(() => {
    // Reset existing bookings when room availability changes
    setExistingBookings([]);

    // Generate available time slots when room availability changes
    if (openTime && closeTime) generateAvailableTimeSlots();
  }, [roomAvailability]);

  return (
    <div className="meeting-scheduler">
      <AvailableTimeSlots
        availableTimeSlots={availableTimeSlots}
        handleTimeSlotSelect={handleTimeSlotSelect}
        existingBookings={existingBookings}
        generateAvailableTimeSlots={generateAvailableTimeSlots}
      />
      <ExistingBookings
        existingBookings={existingBookings}
        setExistingBookings={setExistingBookings}
      />
    </div>
  );
}

export default MeetingScheduler;
