import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Set component's initial state
    this.state = {
      apiCurrentPage: 1,
      apiData: null,
      apiItemsPerPage: 20,
      apiLoadedAllItems: false,
      user: null,
      userIsLoggedIn: false,
    }

    // Scope binding to component methods
    this.getApiData = this.getApiData.bind(this);
  }

  /**
   * Request data from Pokeapi.co
   */
  getApiData() {
    const { apiCurrentPage, apiItemsPerPage } = this.state;
    const offset = apiCurrentPage * apiItemsPerPage;
    let { apiLoadedAllItems } = this.state;

    /**
     * Verify if I already have all information from current query
     */
    if (!apiLoadedAllItems) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${apiItemsPerPage}&offset=${offset}`)
        .then(res => res.json())
        .then(data => {
          let { apiData } = this.state;

          /**
           * Verify if brought all items that matches de query.
           */
          if (data.count >= offset) {
            apiLoadedAllItems = true;
          }

          /**
           * If it's the first time we request data, just assign to the variable,
           * otherwise, concatenate the received array with the current one.
           */
          if (!apiData) {
            apiData = data;
          }
          else {
            apiData = apiData.concat(data);
          }

          this.setState({
            apiData,
            apiLoadedAllItems
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
    else {
      console.log('All items already received.');
    }
  }

  componentDidMount() {
    // this.getApiData();
  }

  render() {
    return (
      <div className="App main-component">
        App
      </div>
    );
  }
}

export default App;
