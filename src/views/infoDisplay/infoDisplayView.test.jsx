import { render, screen } from '@testing-library/react';
import React from 'react';
import InfoDisplayView from './InfoDisplayView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Display View Test Cases', () => {
  it('The user should see the Display list', () => {
    // Arrange
    const infoDisplay = [{
      restaurantBranch: 'mcdonald',
      Location: 'paris',
      Distance: '300km',
    }];
    // jest.spyOn(InfoDisplayView, 'getInfoDisplay').mockImplementation(() => infoDisplay);

    // Act
    render(<InfoDisplayView infoDisplay={infoDisplay} />);
    const restaurantName = screen.getByText(infoDisplay[0].restaurantBranch);

    // Assert
    expect(restaurantName).toBeInTheDocument();
  });
});
