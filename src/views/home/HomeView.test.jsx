import { render, screen } from '@testing-library/react';
import React from 'react';
import * as Auth from '../../contexts/auth/AuthContext';
import HomeView from './HomeView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Home View tests', () => {
  it('Logout button should be visible if a user is logged in', () => {
    render(<HomeView />);
    const text = screen.getByText(/Welcome to 41026/i);
    const logoutBtn = screen.getByText('Logout');

    const contextValues = { currentUser: { name: 'Test-Name' } };
    const welcomeUserMessage = screen.getByText(`Welcome ${contextValues.currentUser.name}`);
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    expect(text).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(welcomeUserMessage).toBeInTheDocument();
  });

  it('Logout button should not be visible if a user is not logged in', () => {
    render(<HomeView />);
    const text = screen.getByText(/Welcome to 41026/i);
    const logoutBtn = screen.getByText('Logout');

    const contextValues = { currentUser: { name: null } };
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    expect(text).toBeInTheDocument();
    expect(logoutBtn).not.toBeInTheDocument();
  });
});
