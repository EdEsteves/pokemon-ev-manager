import React, { Component, PropTypes } from 'react';

import Pokemon from '../Pokemon/Pokemon';

import './PokemonList.css';

class PokemonList extends Component {
  constructor() {
    super();

    this.displayName = 'Pokémon List';
    this.renderPokemon = this.renderPokemon.bind(this);
  }

  static contextTypes = {
    removePokemonFromUserList: PropTypes.func,
    updateUserPokemonData: PropTypes.func,
  }

  renderPokemon() {
    const { userPokemonList, currentUser } = this.props;
    const { removePokemonFromUserList, updateUserPokemonData } = this.context;
    const pokemonList = Object.keys(userPokemonList);
    console.log(userPokemonList, pokemonList);

    if (pokemonList.length) {
      return pokemonList.map(pokemon => {
        return (
          <Pokemon
            key={userPokemonList[pokemon].id}
            pokemon={userPokemonList[pokemon]}
            userPokemonList={userPokemonList}
            currentUser={currentUser}
            removePokemonFromUserList={removePokemonFromUserList}
            updateUserPokemonData={updateUserPokemonData}
          />
        )
      });
    }

    return (
      <div className="PokemonList__empty">
        <p className="PokemonList__text">Seems like you didn't added a Pokémon to list here.</p>
        <p className="PokemonList__text">Use the search form above to start. :)</p>
      </div>
    );
  }

  render() {
    return (
      <div className="PokemonList">
        {this.renderPokemon()}
      </div>
    );
  }
}

export default PokemonList;
