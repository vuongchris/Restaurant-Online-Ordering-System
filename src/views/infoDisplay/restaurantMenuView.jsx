/* eslint-disable react/prop-types */
import React from 'react';
import './table.css';

// Similar function to infoDisplayView but with additional information from the restaurant.
function RestaurantMenuView({
  restaurantMenu,
  addRestaurantMenu,
  setNewMenuName,
  setNewMenuCategory,
  setNewMenuDescription,
  setNewMenuPrice,
  deleteMenu,
  updateMenu,
}) {
  return (
    <>
      <div>

        <table>
          <tbody>
            <tr>
              <th>Restaurant Name</th>
            </tr>
            <tr>
              <th>Menu List</th>
              <th>Menu Category</th>
              <th>Menu Price</th>
              <th>Menu Description</th>
              <th>Delete Menu</th>
              <th>Update Menu</th>
            </tr>

            {restaurantMenu.map((menu) => (

              <tr key={menu.name}>
                <td>{menu.name}</td>
                <td>{menu.category}</td>
                <td>{menu.price}</td>
                <td>{menu.description}</td>
                <td><button type="submit" onClick={() => { deleteMenu(menu.id); }}>Delete Menu</button></td>
                <td><button type="submit" onClick={() => { updateMenu(); }}>Update Menu</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <input placeholder="menu name..." onChange={(event) => { setNewMenuName(event.target.value); }} />
      <input placeholder="menu category..." onChange={(event) => { setNewMenuCategory(event.target.value); }} />
      <input placeholder="price..." onChange={(event) => { setNewMenuPrice(event.target.value); }} />
      <input placeholder="description..." onChange={(event) => { setNewMenuDescription(event.target.value); }} />
      <button type="submit" onClick={addRestaurantMenu}> test button </button>
      <div />

    </>
  );
}

export default RestaurantMenuView;
