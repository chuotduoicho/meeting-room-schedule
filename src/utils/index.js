export const parseTime = (timeString) => {
  // fake the date part to make the comparison easier
  return new Date(`01/01/2000 ${timeString}`);
};

export const isSlotBooked = (start, end, existingBookings) => {
  // Check if the time slot is within any of the existing bookings
  return existingBookings.some((booking) => {
    const bookingStart = parseTime(booking.start);
    const bookingEnd = parseTime(booking.end);
    return (
      (start >= bookingStart && start < bookingEnd) ||
      (end > bookingStart && end <= bookingEnd)
    );
  });
};

export const getTimeSlots = (startTime, endTime, duration) => {
  const timeSlots = [];

  // Create time slots every 10 minutes
  while (startTime < endTime) {
    // Format the time to HH:MM AM/PM
    const slotStartTime = startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Calculate the end time of the slot
    const slotEndTime = new Date(
      startTime.getTime() + duration * 60000
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add the time slot to the list
    timeSlots.push({ start: slotStartTime, end: slotEndTime });

    // Move to the next time slot
    startTime.setMinutes(startTime.getMinutes() + 10);
  }
  return timeSlots;
};
