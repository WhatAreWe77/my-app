import { useState } from 'react';

function AvailableTimes({ onTimeSelect, selectedTime, date }) {
  const [availableTimes, setAvailableTimes] = useState([
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '13:00 PM',
    '13:30 PM',
    '14:00 PM',
    '14:30 PM',
    '15:00 PM',
    '15:30 PM',
    '16:00 PM',
    '16:30 PM',
    '17:00 PM',
    '17:30 PM',
    '18:00 PM',
    '18:30 PM',
    '19:00 PM',
    '19:30 PM',
    '20:00 PM',
  ]);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    onTimeSelect(time);
  };

  return (
    <div className="available-times">
      <label htmlFor="time">Select Time:</label>
      <select
        id="time"
        name="time"
        value={selectedTime}
        onChange={handleTimeChange}
        required
      >
        <option value="">Select a time...</option>
        {availableTimes.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AvailableTimes;