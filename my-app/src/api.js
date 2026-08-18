export function fetchAPI(date) {
  // Mock function that returns available times for a given date
  const mockTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
  return mockTimes;
}

export function submitAPI(formData) {
  // Mock function that submits booking data
  console.log('Submitting booking:', formData);
  return true;
}