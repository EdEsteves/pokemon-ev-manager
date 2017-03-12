import React, { Component } from 'react';

import Pokemon from '../Pokemon/Pokemon';

import './PokemonList.css';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Pokémon List';
  }

  render() {
    const { userPokemonList } = this.props;

    if (userPokemonList.length) {
      return (
        <div className="PokemonList">
          {userPokemonList.map(pokemon => <Pokemon key={pokemon.id} data={pokemon} removePokemonFromUserList={this.props.removePokemonFromUserList} />)}
        </div>
      );
    }

    return (
      <div className="PokemonList__empty">
        <p className="PokemonList__text">Seems like you didn't added a Pokémon to list here.</p>
        <p className="PokemonList__text">Use the search form above to start. :)</p>
      </div>
    );
  }
}

export default PokemonList;
