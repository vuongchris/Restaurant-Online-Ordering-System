import { render, screen } from '@testing-library/react';
import React from 'react';
import InfoDisplayUpdate from './infoDisplayUpdate';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Update View Test Cases', () => {
  it('The user should see the Update list', () => {
    // Arrange
    const infoDisplay = [{
      restaurantBranch: 'mcdonald',
      Location: 'paris',
    }];

    // Act
    render(<InfoDisplayUpdate infoDisplay={infoDisplay} />);
    const restaurantName = screen.getByText(infoDisplay[0].restaurantBranch);

    // Assert
    expect(restaurantName).toBeInTheDocument();
  });
});
