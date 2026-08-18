import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfirmedBooking from './ConfirmedBooking';
import Nav from './Nav.js';
import Main from './Main.js';
import Footer from './Footer.js';
import BookingPage from './BookingPage.js';

function App() {
  return (
    <Router>
      <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
