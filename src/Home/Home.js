import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

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
