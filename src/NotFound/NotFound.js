import React from 'react';

import './NotFound.css';

const NotFound = () => {
  return (
    <div className="NotFound main-content">
      <h2 className="NotFound__title">Oh, karp!</h2>

      <p className="NotFound__text">Feels like you've chosen the wrong poké-url here.</p>

      <p className="NotFound__text">Use the menu to catch'em all.</p>
    </div>
  );
}

export default NotFound;
