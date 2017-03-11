import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Nav from './Nav/Nav';
import Home from './Home/Home';
import About from './About/About';
import App from './App/App';

import './index.css';

import Slideout from 'slideout';

class Root extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Root';
  }

  componentDidMount() {
    this.slideout = new Slideout({
      'panel': document.getElementById('content'),
      'menu': document.getElementById('navigation'),
      'padding': 256,
      'tolerance': 70
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav/>
          <div class="primary-component" id="content">
            <Header slideout={this.slideout} />
            <Match exactly pattern="/" component={Home} slideout={this.slideout} />
            <Match exactly pattern="/about" component={About} slideout={this.slideout} />
            <Match pattern="/app/:userId" component={App} slideout={this.slideout} />
            {/*<Miss component={NotFound} slideout={this.slideout} />*/}
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

render(
  <Root/>,
  document.getElementById('root')
);
