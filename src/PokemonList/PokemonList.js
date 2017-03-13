import React, { Component } from 'react';

import Pokemon from '../Pokemon/Pokemon';

import './PokemonList.css';

class PokemonList extends Component {
  constructor() {
    super();

    this.displayName = 'Pokémon List';
    this.renderPokemon = this.renderPokemon.bind(this);
  }

  renderPokemon() {
    const { userPokemonList, currentUser, removePokemonFromUserList, updateUserPokemonData } = this.props;

    if (userPokemonList.pokemon) {
      return userPokemonList.pokemon.map(pokemon => <Pokemon
        key={pokemon.id}
        pokemon={pokemon}
        userPokemonList={userPokemonList}
        currentUser={currentUser}
        removePokemonFromUserList={removePokemonFromUserList}
        updateUserPokemonData={updateUserPokemonData}
      />);
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
