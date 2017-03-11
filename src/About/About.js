import React, { Component } from 'react';

import './About.css';

class About extends Component {
  render() {
    return (
      <div className="About main-content main-content--fixed">
        <h2 className="About__title">About</h2>

        <h3 className="About__subtitle">What is this application?</h3>
        <p className="About__text">This application is nothing more than a management tool for you to keep the <abbr title="Effort Value">EV</abbr> of your Pokémon up to date with your training.</p>
        <p className="About__text">It doesn't connect with your device or saved game. You have to update your Pokémon stats as you do the training to keep it always synced.</p>

        <h3 className="About__subtitle">Who is this application for?</h3>
        <p className="About__text">It's for me and you and everyone who likes to play Pokémon and wants to train them properly.</p>
        <p className="About__text">You can use any training method you want, but I do recommend you to use the Super Training, introduced in X/Y generation.</p>

        <h3 className="About__subtitle">I'm a developer and want to contribute to this project. How can I do that?</h3>
        <ol className="About__list">
          <li className="About__item">Fork <a href="//github.com/guilhermemarconi/pokemon-ev-management" className="About__anchor" target="_blank">this repo</a>;</li>
          <li className="About__item">Code as much as you want; 🤘</li>
          <li className="About__item">Create a <abbr title="Pull Request">PR</abbr> and I will analyse what you did.</li>
        </ol>
        <p className="About__text">If everything is ok, I'll accept your PR and your contribution will be in the next version as well as your credit will be in the contributors page.</p>
      </div>
    );
  }
}

export default About;
