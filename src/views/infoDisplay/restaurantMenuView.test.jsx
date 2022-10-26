import { render, screen } from '@testing-library/react';
import React from 'react';
import RestaurantMenuView from './restaurantMenuView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('Menu View Test Cases', () => {
  it('The user should see the Menu list', () => {
    // Arrange
    const restaurantMenu = [{
      name: 'Pizza',
      category: 'Fast Food',
      description: 'is good',
      price: '39',
    }];

    // Act
    render(<RestaurantMenuView restaurantMenu={restaurantMenu} />);
    const menuName = screen.getByText(restaurantMenu[0].name);

    // Assert
    expect(menuName).toBeInTheDocument();
  });
});
