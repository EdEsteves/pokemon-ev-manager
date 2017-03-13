import React, { Component } from 'react';

import './Pokemon.css';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Pokémon';

    this.state = {
      isLoaded: false,
    };

    this.removePokemon = this.removePokemon.bind(this);
    this.getPokemonData = this.getPokemonData.bind(this);
  }

  removePokemon(e) {
    e.preventDefault();
    this.props.removePokemonFromUserList(this.props.pokemon);
  }

  getPokemonData() {
    if (this.props.pokemon.data) {
      this.setState({ isLoaded: true });
    }
    else {
      fetch(this.props.pokemon.url)
        .then(res => res.json())
        .then(data => {
          const { pokemon, userPokemonList } = this.props;
          const i = userPokemonList.pokemon.findIndex(item => item.id === pokemon.id);

          userPokemonList.pokemon[i].data = data;

          this.props.updateUserPokemonData({ userPokemonList });
          this.setState({ isLoaded: true });
        })
        .catch(err => console.error(err));
    }
  }

  formatName(name) {
    if (name === 'floette-eternal') {
      return 'eternal floette';
    }
    else if (~name.indexOf('mega')) {
      let nameArr = name.split('-');

      if (nameArr.lengh === 3) {
        return `mega ${nameArr[0]} ${nameArr[2]}`;
      }

      return `mega ${nameArr[0]}`;
    }
    else if (~name.indexOf('primal')) {
      let nameArr = name.split('-');

      return `primal ${nameArr[0]}`;
    }

    return name;
  }

  componentDidMount() {
    this.getPokemonData();
  }

  render() {
    const { isLoaded } = this.state;
    const { pokemon } = this.props;
    const name = pokemon ? this.formatName(pokemon.name) : null;

    if (!isLoaded) {
      return (
        <div className="Pokemon is-loading">
          <button onClick={this.removePokemon}>Remove</button>
          <p>Loading {pokemon.name}...</p>
        </div>
      );
    }

    return (
      <div className="Pokemon">
        <button onClick={this.removePokemon}>Remove</button>
        <img src={pokemon.data.sprites.front_default} alt={name}/>
        <p>{name}</p>
      </div>
    );
  }
}

export default Pokemon;
