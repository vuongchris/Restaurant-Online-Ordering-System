import React from 'react';
import { Link } from 'react-router-dom';

function HomeView() {
  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <h1>Welcome to 41026 - Advanced Software Development!</h1>
      <Link to="login">LOGIN</Link>
      <br />
      <Link to="register">REGISTER</Link>
    </div>
  );
}

export default HomeView;
