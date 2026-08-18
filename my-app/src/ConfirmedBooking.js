import { Link, useLocation } from 'react-router-dom';
import './ConfirmedBooking.css';

function ConfirmedBooking() {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="confirmed-booking">
      <div className="confirmation-container">
        <div className="success-icon">✅</div>

        <h1>Booking Confirmed!</h1>

        <p className="confirmation-message">
          Thank you for your booking. We have received your reservation and
          will send a confirmation email shortly.
        </p>

        {bookingData && (
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-details">
              <p><strong>Name:</strong> {bookingData.name}</p>
              <p><strong>Email:</strong> {bookingData.email}</p>
              <p><strong>Date:</strong> {bookingData.date}</p>
              <p><strong>Time:</strong> {formatTimeForDisplay(bookingData.time)}</p>
              <p><strong>Guests:</strong> {bookingData.guests}</p>
            </div>
          </div>
        )}

        <div className="booking-details">
          <p>📅 Check your email for booking details</p>
          <p>📞 Call us at 1-800-555-0123 for any questions</p>
          <p>✉️ We'll send a confirmation email to your provided address</p>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link to="/booking" className="btn btn-secondary">
            Make Another Booking
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmedBooking;