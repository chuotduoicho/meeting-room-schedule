/* eslint-disable react/prop-types */
const MeetingDurationSelector = ({
  meetingDuration,
  handleMeetingDurationChange,
}) => (
  <>
    <label htmlFor="meetingDuration" style={{ marginRight: "1rem" }}>
      Meeting Duration (minutes):
    </label>
    <select
      id="meetingDuration"
      value={meetingDuration}
      onChange={handleMeetingDurationChange}
      className="time-input"
    >
      {[...Array(12).keys()].map((num) => (
        <option key={num} value={(num + 1) * 10}>
          {(num + 1) * 10}
        </option>
      ))}
    </select>
  </>
);

export default MeetingDurationSelector;
