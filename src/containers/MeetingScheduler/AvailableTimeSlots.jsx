/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TimeSlot from "../../components/TimeSlot";
import MeetingDurationSelector from "../../components/MeetingDurationSelector";
import { isSlotBooked, parseTime } from "../../utils";

const AvailableTimeSlots = ({
  availableTimeSlots = [],
  handleTimeSlotSelect,
  existingBookings = [],
  generateAvailableTimeSlots = () => {},
}) => {
  const [meetingDuration, setMeetingDuration] = useState(30);

  const handleMeetingDurationChange = (e) =>
    setMeetingDuration(parseInt(e.target.value));

  useEffect(() => {
    generateAvailableTimeSlots(meetingDuration);
  }, [meetingDuration]);

  return (
    <div>
      <MeetingDurationSelector
        meetingDuration={meetingDuration}
        handleMeetingDurationChange={handleMeetingDurationChange}
      />
      <h3>Available Time Slots:</h3>
      <ul className="time-slots-container">
        {availableTimeSlots.map((slot, index) => (
          <TimeSlot
            key={index}
            slot={slot}
            isBooked={isSlotBooked(
              parseTime(slot.start),
              parseTime(slot.end),
              existingBookings
            )}
            onTimeSlotSelect={handleTimeSlotSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default AvailableTimeSlots;
