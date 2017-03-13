import React from 'react';

import './Contributors.css';

const Contributors = () => {
  return (
    <div className="Contributors main-content main-content--fixed">
      <h2 className="Contributors__title">Contributors</h2>

      <p className="Contributors__text">People and applications that I would like mention and be grateful.</p>

      <h3 className="Contributors__subtitle">Development</h3>
      <ul className="Contributors__list">
        <li className="Contributors__item">
          <a href="https://pokeapi.co" className="Contributors__anchor" target="_blank">PokéApi</a> - For it's amazing API that made this application possible.
        </li>
      </ul>

      <h3 className="Contributors__subtitle">Ideas and suggestions</h3>
      <ul className="Contributors__list">
        <li className="Contributors__item">Pedro Nascimento (Baiano)</li>
      </ul>
    </div>
  );
};

export default Contributors;
