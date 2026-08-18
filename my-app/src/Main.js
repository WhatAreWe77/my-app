import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import { fetchAPI, submitAPI } from './api';

// EXPORT for testing
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':

      return fetchAPI(action.payload.date);

    case 'REMOVE_TIME':
      return state.filter(time => time !== action.payload);

    case 'ADD_TIME':
      return [...state, action.payload].sort();

    default:
      return state;
  }
}

// EXPORT for testing
export function initializeTimes() {

  const today = new Date();
  return fetchAPI(today);
}

function Main() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );


  const submitForm = (formData) => {

    const isSubmitted = submitAPI(formData);

    if (isSubmitted) {
      navigate('/confirmed', {
        state: { bookingData: formData }
      });
      return true;
    } else {
      console.error('Booking submission failed');
      return false;
    }
  };

  return (
    <main className="main-container">
      <div className="main-header">
        <h1>Welcome to Little Lemon</h1>
        <p className="hero-text">Experience authentic Mediterranean cuisine with a modern twist. 
          Our restaurant offers the finest dining experience with a carefully curated menu 
          prepared by our talented chefs. Join us for an unforgettable evening.</p>
      </div>
      
      <div className="main-content">
        <div className="main-info">
          <img src="/download.jpg" alt="Little Lemon background" className="main-info-bg" />
          <div className="main-info-content">
            <h2>About Little Lemon</h2>
            <p>Little Lemon is a charming neighborhood restaurant dedicated to serving you 
              the finest Mediterranean food. We believe in using the freshest ingredients 
              and traditional cooking techniques.</p>
            <p>Our mission is to create memorable dining experiences that bring people together 
              and celebrate the flavors of the Mediterranean region.</p>
          </div>
        </div>
        
        <aside className="form-sidebar">
          <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
            submitForm={submitForm}
          />
        </aside>
      </div>
    </main>
  );
}

export default Main;