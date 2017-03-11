import React, { Component } from 'react';

import './Home.css';

class Home extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    return (
      <div className="Home main-content">
        <h2 className="Home__title">Welcome to the Pokémon EV Manager</h2>
      </div>
    );
  }
}

export default Home;
