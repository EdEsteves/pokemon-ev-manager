import React, { Component, PropTypes } from 'react';

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
    this.addPokemonToUserList = this.addPokemonToUserList.bind(this);
    this.removePokemonFromUserList = this.removePokemonFromUserList.bind(this);
    this.updateUserPokemonData = this.updateUserPokemonData.bind(this);
  }

  static defaultProps = {
    pokemonList: pokemonList.pokemon,
  }

  static contextTypes = {
    rootState: PropTypes.object,
    router: PropTypes.object,
  }

  static childContextTypes = {
    removePokemonFromUserList: PropTypes.func,
    updateUserPokemonData: PropTypes.func,
    addPokemonToUserList: PropTypes.func,
  }

  getChildContext() {
    return {
      removePokemonFromUserList: this.removePokemonFromUserList,
      updateUserPokemonData: this.updateUserPokemonData,
      addPokemonToUserList: this.addPokemonToUserList,
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.userId}/userPokemonList`, {
      context: this,
      state: 'userPokemonList',
    });
  }

  componentDidMount() {
    const { rootState, router } = this.context;

    if (!rootState.user.id) {
      router.transitionTo('/app');
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addPokemonToUserList(pokemonName) {
    const { userPokemonList } = this.state;
    const { pokemonList } = this.props;
    const pokemonIndex = pokemonList.findIndex(pokemon => pokemonName === pokemon.label);

    userPokemonList[`${pokemonName}:${Date.now()}`] = {
      url: pokemonList[pokemonIndex].url,
      name: pokemonList[pokemonIndex].label,
      id: `${pokemonList[pokemonIndex].label}:${Date.now()}`,
    };

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
        // const i = userPokemonList.pokemon.findIndex(pokemon => pokemon.id === pokemonToRemove.id);

        // userPokemonList.pokemon.splice(i, 1);
        delete userPokemonList[pokemonToRemove.id];
        console.log(userPokemonList);

        this.setState({ userPokemonList });
      }
    });
  }

  updateUserPokemonData(newState) {
    this.setState(newState);
  }

  logout(e) {
    base.unauth();
    this.context.router.transitionTo('/app');
  }

  render() {
    return (
      <div className="App main-content">
        <button className="App__logout" type="button" onClick={(e) => this.logout(e)}>Logout</button>
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
