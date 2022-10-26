import { render, screen } from '@testing-library/react';
import React from 'react';
import InfoDisplayUpdate from './infoDisplayUpdate';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Update View Test Cases', () => {
  it('The user should see the mcdonald', () => {
    // Arrange
    const infoDisplay = [{
      id: 'Restaurant ID:',
      restaurantBranch: 'Restaurant Name',
      Location: 'paris',
    }];
    // jest.spyOn(InfoDisplayView, 'getInfoDisplay').mockImplementation(() => infoDisplay);

    // Act
    render(<InfoDisplayUpdate infoDisplay={infoDisplay} />);
    const restaurantId = screen.getByText(infoDisplay[0].id);

    // Assert
    expect(restaurantId).toBeInTheDocument();
  });
});
