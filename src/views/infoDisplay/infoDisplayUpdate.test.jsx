import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import InfoDisplayUpdate from './infoDisplayUpdate';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Update View Test Cases', () => {
  it('The user should see the Update list', async () => {
    // Arrange
    const restaurantNameInput = screen.getByRole('textbox', { name: 'restName' });
    fireEvent.change(restaurantNameInput, { target: { value: 'KFC' } });
    expect(restaurantNameInput.value).toBe('KFC');

    // Act
    render(<InfoDisplayUpdate />);
    const updateButton = screen.getByRole('button', { name: 'Submit Changes' });
    expect(updateButton).not.toBeDisabled();
    userEvent.click(updateButton);

    // Assert
    expect(await screen.findByText('KFC')).toBeVisible();
  });
});
