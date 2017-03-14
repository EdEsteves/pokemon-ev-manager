import React, { Component, PropTypes } from 'react';

import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  goTo(e) {
    e.preventDefault();
    const pathname = e.currentTarget.dataset.href;
    this.context.router.transitionTo(pathname);
    window.sideNav.toggle();
  }

  render() {
    const { user } = this.props.rootState;

    return (
      <nav className="Nav" id="navigation">
        <ul className="Nav__list unstyled">
          <li className="Nav__item">
            <a data-href="/" className="Nav__anchor" onClick={this.goTo}>Home</a>
          </li>
          <li className="Nav__item">
            <a data-href={user.id ? `/app/${user.id}` : '/app'} className="Nav__anchor" onClick={this.goTo}>Manage Training</a>
          </li>
          <li className="Nav__item">
            <a data-href="/about" className="Nav__anchor" onClick={this.goTo}>About</a>
          </li>
          <li className="Nav__item">
            <a data-href="/contributors" className="Nav__anchor" onClick={this.goTo}>Contributors</a>
          </li>
          <li className="Nav__item">
            <a href="//github.com/guilhermemarconi/pokemon-ev-manager/issues" className="Nav__anchor" target="_blank">Report a bug</a>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
