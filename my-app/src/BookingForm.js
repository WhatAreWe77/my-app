import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './BookingForm.css';

// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .matches(/^[A-Za-z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),

  email: Yup.string()
    .required('Email address is required')
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters')
    .trim()
    .lowercase(),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[\d\s\-+()]{10,15}$/, 'Please enter a valid phone number (10-15 digits)')
    .trim(),

  date: Yup.string()
    .required('Reservation date is required')
    .test('is-future-date', 'Date must be today or in the future', (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    })
    .test('is-within-30-days', 'Date cannot be more than 30 days in advance', (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
      return selectedDate <= thirtyDaysLater;
    }),

  time: Yup.string()
    .required('Reservation time is required')
    .test('is-valid-time', 'Please select a time between 10:00 AM and 11:30 PM', (value) => {
      if (!value) return false;
      return value >= '10:00' && value <= '23:30';
    }),

  guests: Yup.number()
    .required('Number of guests is required')
    .min(1, 'Must have at least 1 guest')
    .max(20, 'Maximum 20 guests allowed')
    .integer('Please enter a whole number')
    .typeError('Please enter a valid number'),

  occasion: Yup.string()
    .oneOf(['regular', 'birthday', 'anniversary', 'business', 'other'], 'Invalid occasion selected'),

  specialRequests: Yup.string()
    .max(500, 'Special requests cannot exceed 500 characters')
    .trim()
});

const BookingForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
      occasion: 'regular',
      specialRequests: ''
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Simulate API call
      console.log('Form submitted:', values);

      // Reset form after submission
      resetForm();
      setSubmitting(false);

      // Navigate to confirmed booking page with booking data
      navigate('/confirmed', { state: { bookingData: values } });
    }
  });

  // Helper function to get today's date for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Helper function to get date 30 days from now for max attribute
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="booking-form">
      <h2>Reserve a Table</h2>

      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your full name"
          className={formik.touched.name && formik.errors.name ? 'error' : ''}
          disabled={formik.isSubmitting}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="your@email.com"
          className={formik.touched.email && formik.errors.email ? 'error' : ''}
          disabled={formik.isSubmitting}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
      </div>

      {/* Phone Field */}
      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="(123) 456-7890"
          className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
          disabled={formik.isSubmitting}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error-message">{formik.errors.phone}</div>
        )}
      </div>

      {/* Date Field */}
      <div className="form-group">
        <label htmlFor="date">Reservation Date *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={getTodayDate()}
          max={getMaxDate()}
          className={formik.touched.date && formik.errors.date ? 'error' : ''}
          disabled={formik.isSubmitting}
        />
        {formik.touched.date && formik.errors.date && (
          <div className="error-message">{formik.errors.date}</div>
        )}
      </div>

      {/* Time Field */}
      <div className="form-group">
        <label htmlFor="time">Reservation Time *</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min="10:00"
          max="23:30"
          step="1800"
          className={formik.touched.time && formik.errors.time ? 'error' : ''}
          disabled={formik.isSubmitting}
        />
        {formik.touched.time && formik.errors.time && (
          <div className="error-message">{formik.errors.time}</div>
        )}
      </div>

      {/* Guests Field */}
      <div className="form-group">
        <label htmlFor="guests">Number of Guests *</label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formik.values.guests}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min="1"
          max="20"
          step="1"
          className={formik.touched.guests && formik.errors.guests ? 'error' : ''}
          disabled={formik.isSubmitting}
        />
        {formik.touched.guests && formik.errors.guests && (
          <div className="error-message">{formik.errors.guests}</div>
        )}
      </div>

      {/* Occasion Field */}
      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formik.values.occasion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        >
          <option value="regular">Regular Dining</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business Meeting</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Special Requests Field */}
      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formik.values.specialRequests}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Any dietary restrictions or special requests..."
          rows="4"
          maxLength="500"
          className={formik.touched.specialRequests && formik.errors.specialRequests ? 'error' : ''}
          disabled={formik.isSubmitting}
        />
        <div className="character-count">
          {formik.values.specialRequests.length}/500 characters
        </div>
        {formik.touched.specialRequests && formik.errors.specialRequests && (
          <div className="error-message">{formik.errors.specialRequests}</div>
        )}
      </div>

      {/* Submit Button - Disabled when form is invalid or submitting */}
      <button
        type="submit"
        className="submit-btn"
        disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
      >
        {formik.isSubmitting ? 'Submitting...' : 'Reserve Table'}
      </button>

      {/* Form-level error message */}
      {formik.submitCount > 0 && !formik.isValid && (
        <div className="form-error-message">
          Please fix all errors before submitting.
        </div>
      )}
    </form>
  );
};

export default BookingForm;