import BookingForm from './BookingForm';

function BookingPage() {
  return (
    <div className="booking-page">
      <h1>Book Your Table</h1>
      <p>Fill in the details below to schedule your booking</p>
      <BookingForm />
    </div>
  );
}

export default BookingPage;