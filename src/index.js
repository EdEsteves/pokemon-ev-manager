import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import About from './About/About';
import Contributors from './Contributors/Contributors';
import App from './App/App';
import Auth from './Auth/Auth';
import NotFound from './NotFound/NotFound';
import base from './base';
import swal from 'sweetalert';

import './index.css';

class Root extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loggedIn: false,
      user: {},
    }
    this.updateRootState = this.updateRootState.bind(this);
    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
  }

  static childContextTypes = {
    rootState: PropTypes.object,
    updateRootState: PropTypes.func,
    createUser: PropTypes.func,
    login: PropTypes.func,
  }

  getChildContext() {
    return {
      rootState: this.state,
      updateRootState: this.updateRootState,
      createUser: this.createUser,
      login: this.login,
    }
  }

  /**
   * Let child components update the state Root
   * @param {Object} state New state
   */
  updateRootState(state) {
    this.setState(state);
  }

  /**
   * Create a new user
   * @param {Object} userData Object containing data from the user we'll create
   * @param {String} userData.email User email
   * @param {String} userData.password User password
   * @param {String} userData.username User reserved URL
   * @param {Function} callback Callback function that runs after creating user
   */
  createUser(userData, callback) {
    base.createUser({
      email: userData.email,
      password: userData.password
    }, (err, user) => {
      if (err) {
        console.error(err);
        swal({
          type: 'error',
          title: 'Oops! Something went wrong.',
          text: err.message,
        });
      }
      callback(err, user);
    });
  }

  /**
   * Authenticate user with email and password
   * @param {Object} userData Object with user data to login
   * @param {String} userData.email User email
   * @param {String} userData.password User password
   * @param {Function} callback Callback function that runs after login
   */
  login(userData, callback) {
    base.authWithPassword({
      email: userData.email,
      password: userData.password,
    }, (err, user) => {
      if (err) {
        console.error(err);
        swal({
          type: 'error',
          title: 'Oops! Something went wrong.',
          text: err.message,
        });
      }
      callback(err, user);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav rootState={this.state} />

          <div className="primary-component" id="content">
            <Header />
            <Match exactly pattern="/" component={Home} />
            <Match exactly pattern="/about" component={About} />
            <Match exactly pattern="/contributors" component={Contributors} />
            <Match exactly pattern="/app" component={Auth} />
            <Match pattern="/app/:userId" component={App} />
            <Miss component={NotFound} />
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
