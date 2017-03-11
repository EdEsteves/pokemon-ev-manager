import React, { Component } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Pokemon from '../Pokemon/Pokemon';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'EV Manager'

    this.state = {
      apiData: null,
    }

    // Scope binding to component methods that require `this`
    this.getApiData = this.getApiData.bind(this);
  }

  /**
   * Request data from Pokeapi.co
   * @param {String} [url] URL for request data
   */
  getApiData(url = `https://pokeapi.co/api/v2/pokemon/?limit=100`) {
    const { apiCurrentPage } = this.state;
    let { apiData, apiLoadedAllItems } = this.state;
    const storage = sessionStorage.getItem('pokeApiData');

    console.log(url);

    /**
     * Verify if we already brought the data and have it storaged locally
     * and if we already brought all data.
     * If not, we'll request it from the API.
     */
    if (storage && apiLoadedAllItems) {
      this.setState({
        apiData: JSON.parse(storage),
        apiLoadedAllItems: true,
      });
    }
    else {
      /**
       * Verify if I already have all information from current query
       */
      if (!apiLoadedAllItems) {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            /**
             * If it's the first time we request data, just assign to the variable,
             * otherwise, concatenate the received array with the current one.
             */
            if (apiData) {
              apiData = apiData.concat(data.results);
            }
            else {
              apiData = data.results;
            }

            /**
             * Store data locally for performance
             */
            sessionStorage.setItem('pokeApiData', apiData);

            this.setState({
              apiData,
              apiLoadedAllItems: data.next ? false : true,
            });

            /**
             * If data.next isn't null, request again
             */
            if (data.next) {
              this.getApiData(data.next);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
      else {
        console.log('All items already received.');
      }
    }
  }

  componentDidMount() {
    // this.getApiData();
  }

  render() {
    return (
      <div className="App main-content">
        <SearchForm />
      </div>
    );
  }
}

export default App;
