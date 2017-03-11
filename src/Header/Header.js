import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Header__title">EV Manager</h1>
      </header>
    );
  }
}

export default Header;
