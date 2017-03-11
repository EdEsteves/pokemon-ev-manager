import React, { Component } from 'react';
import './Header.css';

import Slideout from 'slideout';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav(e) {
    e.preventDefault();
    window.sideNav.toggle();
  }

  componentDidMount() {
    window.sideNav = new Slideout({
      'panel': document.getElementById('content'),
      'menu': document.getElementById('navigation'),
      'padding': 256,
      'tolerance': 70
    });
  }

  componentWillUnmount() {
    window.sideNav.destroy();
  }

  render() {
    return (
      <header className="Header">
        <button className="Header__btn hamburger" type="button"
          aria-label="Menu" aria-controls="navigation" onClick={this.toggleNav}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

        <h1 className="Header__title">EV Manager</h1>
      </header>
    );
  }
}

export default Header;
