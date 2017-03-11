import React, { Component } from 'react';
import './Footer.css';

const pkgJson = require('../../package.json');

class Footer extends Component {
  render() {
    return(
      <footer className="Footer">
        <p className="Footer__credits">
          <span className="Footer__version">v{pkgJson.version}</span>
          Made with a <span className="Footer__credits-icon" title="Macbook">💻</span> by Guilherme Marconi
        </p>
      </footer>
    );
  }
}

export default Footer;
