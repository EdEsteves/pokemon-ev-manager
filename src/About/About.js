import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './About.css';

class About extends Component {
  render() {
    return (
      <div className="About primary-component">
        <Header/>
        <div className="main-content">
          <h2 className="About__title">About</h2>

          <h3 className="About__subtitle">What is this application?</h3>
          <p className="About__text"></p>

          <h3 className="About__subtitle">Who is this application for?</h3>
          <p className="About__text"></p>

          <h3 className="About__subtitle">I'm a developer and like to contribute to this project. How can I do that?</h3>
          <p className="About__text"></p>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default About;
