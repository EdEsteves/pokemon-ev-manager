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
          <p className="About__text">This application more than a management tool for you to keep the <abbr title="Effort Value">EV</abbr> of your Pokémon up to date with your training.</p>
          <p className="About__text">It doesn't do any connection with your device or game. You have to update your Pokémon stats as you do the training to keep it always updated.</p>

          <h3 className="About__subtitle">Who is this application for?</h3>
          <p className="About__text">It is for you and me and everybody who likes to play Pokémon and uses to training their Pokémon appropriately.</p>
          <p className="About__text">You can use any training method you want, but I do recomend you to use the Super Training, introduced in X/Y generation.</p>

          <h3 className="About__subtitle">I'm a developer and like to contribute to this project. How can I do that?</h3>
          <ul className="About__list">
            <li className="About__item">Fork <a href="//github.com/guilhermemarconi/pokemon-ev-management" className="About__anchor" target="_blank">this repo</a>;</li>
            <li className="About__item">Code as much as you want to;</li>
            <li className="About__item">Create a <abbr title="Pull Request">PR</abbr> and I will analyse what you did.</li>
          </ul>
          <p className="About__text">If everything is ok, I'll accept your PR and your contribution will be in the next version as well as your credit will be in the contributors page.</p>
          <p className="About__text">Easy as pie, isn't it?</p>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default About;
