import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Home.scss';

class Home extends Component {
  render() {
    return (
      <div className="Home primary-component">
        <Header/>
        <div className="main-content">
          <h2 className="Home__title">Welcome to the Pokémon EV Manager</h2>
        </div>
        <Footer/>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
}

export default Home;
