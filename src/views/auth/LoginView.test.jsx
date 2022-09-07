import { render, screen } from '@testing-library/react';
import React from 'react';
import LoginView from './LoginView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('LoginView tests', () => {
  render(<LoginView />);
  const emailField = screen.getByLabelText(/Email/i);
  const passwordField = screen.getByLabelText(/Password/i);
  const login = screen.getAllByText(/Login/i)[0];

  it('All login form fields should render on the page', () => {
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });
});
