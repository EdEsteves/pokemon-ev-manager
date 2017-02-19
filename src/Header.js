import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Header__title">Pokémon EV Manager</h1>
      </header>
    );
  }
}

export default Header;
