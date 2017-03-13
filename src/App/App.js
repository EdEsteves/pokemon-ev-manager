import React, { Component } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import PokemonList from '../PokemonList/PokemonList';

import base from '../base';
import swal from 'sweetalert';

const pokemonList = require('../pokemonList.json');

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.displayName = 'EV Manager'

    this.state = {
      userPokemonList: {},
    }

    // Scope binding to component methods that require `this`
    this.getApiData = this.getApiData.bind(this);
    this.addPokemonToUserList = this.addPokemonToUserList.bind(this);
    this.removePokemonFromUserList = this.removePokemonFromUserList.bind(this);
    this.updateUserPokemonData = this.updateUserPokemonData.bind(this);
  }

  static defaultProps = {
    pokemonList: pokemonList.pokemon,
  }

  /**
   * Request data from Pokeapi.co
   * @param {String} [url] URL for request data
   */
  getApiData(url = `https://pokeapi.co/api/v2/pokemon/?limit=100`) {
    let { apiData, apiLoadedAllItems } = this.state;
    const storage = sessionStorage.getItem('pokeApiData');

    /**
     * Verify if we already brought the data and have it storaged locally
     * and if we already brought all data.
     * If not, we'll request it from the API.
     */
    if (storage && apiLoadedAllItems) {
      this.setState({
        apiData: JSON.parse(storage),
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

  addPokemonToUserList(pokemonName) {
    const { userPokemonList } = this.state;
    const { pokemonList } = this.props;
    const pokemonIndex = pokemonList.findIndex(pokemon => pokemonName === pokemon.label);

    if (!userPokemonList.pokemon) {
      userPokemonList.pokemon = [];
    }

    // userPokemonList[`${pokemonName}:${Date.now()}`] = {
    userPokemonList.pokemon.push({
      url: pokemonList[pokemonIndex].url,
      name: pokemonList[pokemonIndex].label,
      id: `${pokemonList[pokemonIndex].label}:${Date.now()}`,
    });

    this.setState({ userPokemonList });
  }

  removePokemonFromUserList(pokemonToRemove) {
    swal({
      type: 'warning',
      title: 'Are you sure?',
      text: `All the progress you've made with ${pokemonToRemove.name} will be lost.`,
      showCancelButton: true,
      confirmButtonColor: '#ee1515',
      confirmButtonText: `Yes, remove ${pokemonToRemove.name}`,
      cancelButtonText: `No, keep it`,
    }, confirm => {
      if (confirm) {
        let { userPokemonList } = this.state;
        const i = userPokemonList.pokemon.findIndex(pokemon => pokemon.id === pokemonToRemove.id);

        userPokemonList.pokemon.splice(i, 1);

        this.setState({ userPokemonList });
      }
    });
  }

  updateUserPokemonData(newState) {
    this.setState(newState);
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.userId}/userPokemonList`, {
      context: this,
      state: 'userPokemonList',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="App main-content">
        <SearchForm
          ref="searchForm"
          data={this.props.pokemonList}
          addPokemonToUserList={this.addPokemonToUserList}
        />
        <PokemonList
          currentUser={this.props.params.userId}
          userPokemonList={this.state.userPokemonList}
          removePokemonFromUserList={this.removePokemonFromUserList}
          updateUserPokemonData={this.updateUserPokemonData}
        />
      </div>
    );
  }
}

export default App;
