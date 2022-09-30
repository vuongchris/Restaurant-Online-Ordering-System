import { render, screen } from '@testing-library/react';
import React from 'react';
import * as Auth from '../../contexts/auth/AuthContext';
import HomeView from './HomeView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Home View tests', () => {
  it('When a user is logged in, they should be welcome by their email, and a logout button should be shown', () => {
    // Arrange
    const contextValues = { currentUser: { email: 'Test@email.com' } };
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    // Act
    render(<HomeView />);
    const text = screen.getByText(/Welcome to 41026/i);
    const logoutBtn = screen.getByText('Logout');
    const welcomeUserMessage = screen.getByText(`Welcome, ${contextValues.currentUser.email}`);

    // Assert
    expect(text).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(welcomeUserMessage).toBeInTheDocument();
  });

  it('Logout button should not be visible if the current user is not logged in', () => {
    // Arrange
    const contextValues = { currentUser: null };
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    // Act
    render(<HomeView />);
    const text = screen.getByText(/Welcome to 41026/i);
    const logoutBtn = screen.queryByText(/logout/i);

    // Assert
    expect(text).toBeInTheDocument();
    expect(logoutBtn).not.toBeInTheDocument();
  });
});
