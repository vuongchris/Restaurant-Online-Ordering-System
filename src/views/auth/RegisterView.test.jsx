import { render, screen } from '@testing-library/react';
import React from 'react';
import RegisterView from './RegisterView';

jest.mock('react-router-dom', () => ({
  Link: () => <div />,
}));

describe('LoginView tests', () => {
  render(<RegisterView />);
  const emailField = screen.getByLabelText(/Email/i);
  const passwordField = screen.getByLabelText(/Password/i);
  const register = screen.getAllByText(/Register/i)[0];

  it('All registration form fields should render on the page', () => {
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(register).toBeInTheDocument();
  });
});
