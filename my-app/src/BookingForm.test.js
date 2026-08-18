import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

// Mock the dispatch function
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

// Mock available times
const mockAvailableTimes = ['17:00', '17:30', '18:00', '18:30', '19:00'];

const renderBookingForm = (props = {}) =>
  render(
    <BookingForm
      availableTimes={mockAvailableTimes}
      dispatch={mockDispatch}
      submitForm={mockSubmitForm}
      {...props}
    />
  );

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmitForm.mockReturnValue(true);
  });

  describe('Static Text Tests', () => {
    test('Renders the BookingForm heading', () => {
      renderBookingForm();
      const headingElement = screen.getByText("Book Your Appointment");
      expect(headingElement).toBeInTheDocument();
    });

    test('Renders the BookingForm subtitle', () => {
      renderBookingForm();
      const subtitleElement = screen.getByText("Please fill in the details below to schedule your booking");
      expect(subtitleElement).toBeInTheDocument();
    });

    test('Renders all form labels', () => {
      renderBookingForm();
      expect(screen.getByText("Full Name:")).toBeInTheDocument();
      expect(screen.getByText("Email Address:")).toBeInTheDocument();
      expect(screen.getByText("Select Date:")).toBeInTheDocument();
      expect(screen.getByText("Select Time:")).toBeInTheDocument();
      expect(screen.getByText("Number of Guests:")).toBeInTheDocument();
    });

    test('Renders the submit button', () => {
      renderBookingForm();
      const buttonElement = screen.getByText("Book Now");
      expect(buttonElement).toBeInTheDocument();
    });

    test('Renders the time slots available count', () => {
      renderBookingForm();
      const countElement = screen.getByText("5 time slots available");
      expect(countElement).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    test('should call submitForm when form is submitted', async () => {
      const user = userEvent.setup();
      mockSubmitForm.mockReturnValue(true);

      render(
        <BookingForm
          availableTimes={mockAvailableTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      );

      // Fill out the form
      await user.type(screen.getByLabelText('Full Name:'), 'John Doe');
      await user.type(screen.getByLabelText('Email Address:'), 'john@example.com');

      const dateInput = screen.getByLabelText('Select Date:');
      await user.type(dateInput, '2026-08-17');

      const timeSelect = screen.getByLabelText('Select Time:');
      await user.selectOptions(timeSelect, '17:00');

      // Submit the form
      const submitButton = screen.getByText('Book Now');
      await user.click(submitButton);

      // Verify submitForm was called with correct data
      expect(mockSubmitForm).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        date: '2026-08-17',
        time: '17:00',
        guests: 1
      });
    });

    test('should show validation errors when form is submitted with empty fields', async () => {
      const user = userEvent.setup();

      render(
        <BookingForm
          availableTimes={mockAvailableTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      );

      // Submit without filling fields
      const submitButton = screen.getByText('Book Now');
      await user.click(submitButton);

      // Check that submitForm was not called
      expect(mockSubmitForm).not.toHaveBeenCalled();
    });

    test('should show loading state while submitting', async () => {
      const user = userEvent.setup();

      // Make submitForm take some time
      mockSubmitForm.mockImplementation(() => {
        return true;
      });

      render(
        <BookingForm
          availableTimes={mockAvailableTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      );

      // Fill and submit form
      await user.type(screen.getByLabelText('Full Name:'), 'John Doe');
      await user.type(screen.getByLabelText('Email Address:'), 'john@example.com');

      const dateInput = screen.getByLabelText('Select Date:');
      await user.type(dateInput, '2026-08-17');

      const timeSelect = screen.getByLabelText('Select Time:');
      await user.selectOptions(timeSelect, '17:00');

      const submitButton = screen.getByText('Book Now');
      await user.click(submitButton);

      // Button should show loading state
      expect(screen.getByText('Booking...')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('should show error message when submitForm returns false', async () => {
      const user = userEvent.setup();
      mockSubmitForm.mockReturnValue(false);
      window.alert = jest.fn(); // Mock alert

      render(
        <BookingForm
          availableTimes={mockAvailableTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      );

      // Fill and submit form
      await user.type(screen.getByLabelText('Full Name:'), 'John Doe');
      await user.type(screen.getByLabelText('Email Address:'), 'john@example.com');

      const dateInput = screen.getByLabelText('Select Date:');
      await user.type(dateInput, '2026-08-17');

      const timeSelect = screen.getByLabelText('Select Time:');
      await user.selectOptions(timeSelect, '17:00');

      const submitButton = screen.getByText('Book Now');
      await user.click(submitButton);

      // Alert should be shown
      expect(window.alert).toHaveBeenCalledWith('Booking failed. Please try again.');
    });
  });
});