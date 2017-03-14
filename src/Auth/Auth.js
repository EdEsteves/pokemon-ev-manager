import React, { Component, PropTypes } from 'react';
import base from '../base';

import './Auth.css';

/**
 * @class Auth
 * Render forms for login and sign-up
 */
class Auth extends Component {
  constructor() {
    super();

    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  static contextTypes = {
    rootState: PropTypes.object,
    updateRootState: PropTypes.func,
    createUser: PropTypes.func,
    login: PropTypes.func,
    router: PropTypes.object,
  }

  componentDidMount() {
    const { updateRootState, router } = this.context;

    base.onAuth((user) => {
      if (user) {
        updateRootState({
          loggedIn: true,
          user: {
            email: user.email,
            id: user.uid,
          }
        });
        router.transitionTo(`/app/${user.uid}`);
      }
    });
  }

  authHandler(err, user) {
    if (err) {
      return;
    }
    else if (user) {
      const userRef = base.database().ref();

      userRef.once('value', (trainingCamp) => {
        const data = trainingCamp.val() || {};

        if (!data[user.uid]) {
          const obj = {};

          obj[user.uid] = {
            user: {
              email: user.email,
              id: user.uid,
            }
          }

          userRef.set(obj);
        }
      });
    }
  }

  /**
   * Handle sign up form submition
   * @param {Object} e Form event
   */
  signUp(e) {
    e.preventDefault();
    const { userEmail, userPassword } = this.refs;
    this.context.createUser({
      email: userEmail.value,
      password: userPassword.value,
    }, this.authHandler);
  }

  /**
   * Handle login form submition
   * @param {Object} e Form event
   */
  login(e) {
    e.preventDefault();
    const { loginEmail, loginPassword } = this.refs;
    this.context.login({
      email: loginEmail.value,
      password: loginPassword.value,
    }, this.authHandler);
  }

  render() {
    return (
      <div className="Auth main-content">
        <form className="Auth__form" noValidate onSubmit={(e) => this.login(e)}>
          <h2 className="Auth__form-title">Login</h2>

          <div className="Auth__field">
            <label htmlFor="loginEmail" className="Auth__label">Email</label>
            <input type="email" className="Auth__input" id="loginEmail" ref="loginEmail"/>
          </div>

          <div className="Auth__field">
            <label htmlFor="loginPassword" className="Auth__label">Password</label>
            <input type="password" className="Auth__input" id="loginPassword" ref="loginPassword"/>
          </div>

          <div className="Auth__field Auth__field--buttons">
            <button className="Auth__button" type="submit">Login</button>
          </div>
        </form>

        <div className="Auth__divisor"></div>

        <form className="Auth__form" noValidate onSubmit={(e) => this.signUp(e)}>
          <h2 className="Auth__form-title">Sign up</h2>

          <div className="Auth__field">
            <label htmlFor="userEmail" className="Auth__label">Email</label>
            <input type="email" className="Auth__input" id="userEmail" ref="userEmail" />
          </div>

          <div className="Auth__field">
            <label htmlFor="userPassword" className="Auth__label">Password</label>
            <input type="password" className="Auth__input" id="userPassword" ref="userPassword" />
          </div>

          <div className="Auth__field Auth__field--buttons">
            <button className="Auth__button" type="submit">Let's train</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
