import { updateTimes, initializeTimes } from './Main';

global.fetchAPI = jest.fn();

describe('initializeTimes', () => {
  test('should return the correct initial state using fetchAPI', () => {
    // Arrange: Mock today's date and fetchAPI response
    const mockToday = new Date();
    const mockTimes = ['17:00', '17:30', '18:00', '18:30', '19:00'];

    // Mock fetchAPI to return a non-empty array
    global.fetchAPI.mockReturnValue(mockTimes);

    // Act: Call the initializeTimes function
    const initialState = initializeTimes();

    // Assert: Verify fetchAPI was called with today's date
    expect(global.fetchAPI).toHaveBeenCalledWith(expect.any(Date));

    // Assert: Verify the result matches the mock
    expect(initialState).toEqual(mockTimes);
    expect(initialState).toHaveLength(5);
    expect(initialState).not.toEqual([]);
  });

  test('should use today\'s date when calling fetchAPI', () => {
    // Arrange: Mock the fetchAPI function
    global.fetchAPI.mockReturnValue(['17:00']);
    // Act: Call initializeTimes
    const today = new Date();
    initializeTimes();

    // Assert: Verify fetchAPI was called with a Date object
    expect(global.fetchAPI).toHaveBeenCalledWith(expect.any(Date));

    // Verify the date passed is roughly today
    const dateArg = global.fetchAPI.mock.calls[0][0];
    expect(dateArg).toBeInstanceOf(Date);
    expect(dateArg.getDate()).toBe(today.getDate());
    expect(dateArg.getMonth()).toBe(today.getMonth());
    expect(dateArg.getFullYear()).toBe(today.getFullYear());
  });

  test('should return a non-empty array of times', () => {
    // Arrange: Mock fetchAPI to return times
    const mockTimes = ['17:00', '17:30', '18:00'];
    global.fetchAPI.mockReturnValue(mockTimes);

    // Act: Call initializeTimes
    const initialState = initializeTimes();

    // Assert: Should return a non-empty array
    expect(Array.isArray(initialState)).toBe(true);
    expect(initialState.length).toBeGreaterThan(0);
  });

  test('should return time strings in the correct format (HH:MM)', () => {
    // Arrange: Mock fetchAPI with specific times
    const mockTimes = ['17:00', '17:30', '18:00'];
    global.fetchAPI.mockReturnValue(mockTimes);

    // Act: Call initializeTimes
    const initialState = initializeTimes();

    // Assert: All times should be strings with format HH:MM
    initialState.forEach(time => {
      expect(typeof time).toBe('string');
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
  });
});

describe('updateTimes', () => {
  // Test the UPDATE_TIMES action with date parameter
  describe('UPDATE_TIMES action', () => {
    test('should return updated times when UPDATE_TIMES is dispatched with a date', () => {
      // Arrange
      const initialState = ['17:00', '17:30'];
      const selectedDate = new Date('2026-08-17');
      const mockNewTimes = ['18:00', '18:30', '19:00', '19:30'];

      // Mock fetchAPI to return new times based on the selected date
      global.fetchAPI.mockReturnValue(mockNewTimes);

      const action = {
        type: 'UPDATE_TIMES',
        payload: { date: selectedDate }
      };

      // Act
      const newState = updateTimes(initialState, action);

      // Assert
      expect(global.fetchAPI).toHaveBeenCalledWith(selectedDate);
      expect(newState).toEqual(mockNewTimes);
      expect(newState).not.toEqual(initialState);
    });

    test('should pass the selected date to fetchAPI when UPDATE_TIMES is dispatched', () => {
      // Arrange
      const initialState = ['17:00', '17:30'];
      const selectedDate = new Date('2026-08-18');
      const mockNewTimes = ['18:00', '18:30'];

      global.fetchAPI.mockReturnValue(mockNewTimes);

      const action = {
        type: 'UPDATE_TIMES',
        payload: { date: selectedDate }
      };

      // Act
      updateTimes(initialState, action);

      // Assert
      expect(global.fetchAPI).toHaveBeenCalledWith(selectedDate);

      // Verify the date passed is exactly the selected date
      const dateArg = global.fetchAPI.mock.calls[0][0];
      expect(dateArg).toEqual(selectedDate);
      expect(dateArg.getFullYear()).toBe(2026);
      expect(dateArg.getMonth()).toBe(7); // August (0-indexed)
      expect(dateArg.getDate()).toBe(18);
    });

    test('should handle different dates returning different times', () => {
      // Arrange
      const initialState = ['17:00', '17:30'];

      // Mock different times for different dates
      global.fetchAPI
        .mockReturnValueOnce(['18:00', '18:30']) // First call
        .mockReturnValueOnce(['19:00', '19:30', '20:00']); // Second call

      const date1 = new Date('2026-08-17');
      const date2 = new Date('2026-08-18');

      // Act
      const action1 = { type: 'UPDATE_TIMES', payload: { date: date1 } };
      const newState1 = updateTimes(initialState, action1);

      const action2 = { type: 'UPDATE_TIMES', payload: { date: date2 } };
      const newState2 = updateTimes(initialState, action2);

      // Assert
      expect(newState1).toEqual(['18:00', '18:30']);
      expect(newState2).toEqual(['19:00', '19:30', '20:00']);
      expect(newState1).not.toEqual(newState2);
    });
  });

  // Test the REMOVE_TIME action
  describe('REMOVE_TIME action', () => {
    test('should remove a time slot from the state', () => {
      const initialState = ['17:00', '17:30', '18:00'];
      const action = {
        type: 'REMOVE_TIME',
        payload: '17:30'
      };

      const newState = updateTimes(initialState, action);

      expect(newState).toEqual(['17:00', '18:00']);
      expect(newState).not.toContain('17:30');
    });

    test('should not remove if time slot does not exist', () => {
      const initialState = ['17:00', '17:30', '18:00'];
      const action = {
        type: 'REMOVE_TIME',
        payload: '19:00'
      };

      const newState = updateTimes(initialState, action);

      expect(newState).toEqual(initialState);
    });

    test('should return an empty array when removing the last time', () => {
      const initialState = ['17:00'];
      const action = {
        type: 'REMOVE_TIME',
        payload: '17:00'
      };

      const newState = updateTimes(initialState, action);

      expect(newState).toEqual([]);
    });
  });

  // Test the ADD_TIME action
  describe('ADD_TIME action', () => {
    test('should add a new time slot to the state', () => {
      const initialState = ['17:00', '17:30'];
      const action = {
        type: 'ADD_TIME',
        payload: '18:00'
      };

      const newState = updateTimes(initialState, action);

      expect(newState).toContain('18:00');
      expect(newState).toHaveLength(3);
    });

    test('should sort times after adding a new time', () => {
      const initialState = ['17:30', '17:00'];
      const action = {
        type: 'ADD_TIME',
        payload: '18:00'
      };

      const newState = updateTimes(initialState, action);

      expect(newState).toEqual(['17:00', '17:30', '18:00']);
    });

    test('should handle adding multiple times in order', () => {
      const initialState = ['17:00'];

      // Add 17:30
      let newState = updateTimes(initialState, {
        type: 'ADD_TIME',
        payload: '17:30'
      });
      expect(newState).toEqual(['17:00', '17:30']);

      // Add 18:00
      newState = updateTimes(newState, {
        type: 'ADD_TIME',
        payload: '18:00'
      });
      expect(newState).toEqual(['17:00', '17:30', '18:00']);
    });
  });

  // Test unknown action types
  describe('Unknown action types', () => {
    test('should return the same state for unknown action type', () => {
      const initialState = ['17:00', '17:30'];
      const action = { type: 'UNKNOWN_ACTION' };

      const newState = updateTimes(initialState, action);

      expect(newState).toEqual(initialState);
    });

    test('should not call fetchAPI for unknown actions', () => {
      global.fetchAPI.mockClear();

      const initialState = ['17:00', '17:30'];
      const action = { type: 'UNKNOWN_ACTION' };

      updateTimes(initialState, action);

      expect(global.fetchAPI).not.toHaveBeenCalled();
    });
  });

  // Test state immutability
  describe('State immutability', () => {
    test('should not mutate the original state when removing', () => {
      const initialState = ['17:00', '17:30', '18:00'];
      const originalState = [...initialState];
      const action = {
        type: 'REMOVE_TIME',
        payload: '17:30'
      };

      updateTimes(initialState, action);

      // Original state should remain unchanged
      expect(initialState).toEqual(originalState);
    });

    test('should not mutate the original state when adding', () => {
      const initialState = ['17:00', '17:30'];
      const originalState = [...initialState];
      const action = {
        type: 'ADD_TIME',
        payload: '18:00'
      };

      updateTimes(initialState, action);

      // Original state should remain unchanged
      expect(initialState).toEqual(originalState);
    });
  });

  // Integration tests with initializeTimes
  describe('Integration with initializeTimes', () => {
    test('should work with initializeTimes as initial state', () => {
      // Arrange
      const mockInitialTimes = ['17:00', '17:30', '18:00'];
      global.fetchAPI.mockReturnValue(mockInitialTimes);

      const initialState = initializeTimes();
      const selectedDate = new Date('2026-08-17');
      const mockNewTimes = ['18:30', '19:00', '19:30'];

      global.fetchAPI.mockReturnValue(mockNewTimes);

      const action = {
        type: 'UPDATE_TIMES',
        payload: { date: selectedDate }
      };

      // Act
      const newState = updateTimes(initialState, action);

      // Assert
      expect(newState).toEqual(mockNewTimes);
      expect(newState).not.toEqual(initialState);
    });

    test('should handle multiple UPDATE_TIMES dispatches', () => {
      // Arrange
      const mockInitialTimes = ['17:00', '17:30'];
      global.fetchAPI.mockReturnValueOnce(mockInitialTimes);
      const initialState = initializeTimes();

      // Mock different times for different dates
      global.fetchAPI
        .mockReturnValueOnce(['18:00', '18:30']) // First update
        .mockReturnValueOnce(['19:00', '19:30', '20:00']); // Second update

      const date1 = new Date('2026-08-17');
      const date2 = new Date('2026-08-18');

      // Act
      const action1 = { type: 'UPDATE_TIMES', payload: { date: date1 } };
      const state1 = updateTimes(initialState, action1);

      const action2 = { type: 'UPDATE_TIMES', payload: { date: date2 } };
      const state2 = updateTimes(state1, action2);

      // Assert
      expect(state1).toEqual(['18:00', '18:30']);
      expect(state2).toEqual(['19:00', '19:30', '20:00']);
    });
  });
});