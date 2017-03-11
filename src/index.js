import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Nav from './Nav/Nav';
import Home from './Home/Home';
import About from './About/About';
import App from './App/App';
import NotFound from './NotFound/NotFound';

import './index.css';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <div className="primary-component" id="content">
            <Header />
            <Match exactly pattern="/" component={Home} />
            <Match exactly pattern="/about" component={About} />
            <Match pattern="/app/:userId" component={App} />
            {<Miss component={NotFound} />}
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
