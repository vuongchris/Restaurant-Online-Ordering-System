/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import React from 'react';
import NotificationView from './notificationView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Display View Test Cases', () => {
  it('The page should load information', () => {
    // Arrange

    // jest.spyOn(NotificationView, 'sendEmail').mockImplementation(() => emailInfo);

    // Act
    render(<NotificationView />);
    // const restaurantName = screen.getByText(emailInfo[0].email);

    // Assert
    expect(screen.getByRole('button', { value: 'Send Message' })).toBeEnabled();
  });
  it('console.log the text "OK"', () => {
    const logSpy = jest.spyOn(console, 'log');

    console.log('OK');

    expect(logSpy).toHaveBeenCalledWith('OK');
  });
});
