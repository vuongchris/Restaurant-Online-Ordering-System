import { render, screen } from '@testing-library/react';
import React from 'react';
import * as Auth from '../../contexts/auth/AuthContext';
import LocationView from './LocationView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Payment View tests', () => {
  it('All fields should be present on the page', () => {
    // Arrange
    const contextValues = { currentUser: { email: 'Test@email.com' } };
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    // Act
    render(<LocationView />);
    const locations = screen.getByText(/Locationss/i);
    // Assert
    expect(locations).toBeInTheDocument();
  });
});
