import React, { Component } from 'react';

import './Pokemon.css';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Pokémon';

    this.state = {
      pokemon: null,
      isLoaded: false,
    };

    this.removePokemon = this.removePokemon.bind(this);
    this.getPokemonData = this.getPokemonData.bind(this);
  }

  removePokemon(e) {
    e.preventDefault();
    this.props.removePokemonFromUserList(this.props.data);
  }

  getPokemonData() {
    fetch(this.props.data.url)
      .then(res => res.json())
      .then(pokemon => {
        this.setState({
          pokemon,
          isLoaded: true,
        });
      })
      .catch(err => console.error(err));
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
    const { pokemon, isLoaded } = this.state;
    const { data } = this.props;
    const name = pokemon ? this.formatName(pokemon.name) : null;

    if (!isLoaded) {
      return (
        <div className="Pokemon is-loading">
          <button onClick={this.removePokemon}>Remove</button>
          <p>Loading {data.name}...</p>
        </div>
      );
    }

    return (
      <div className="Pokemon">
        <button onClick={this.removePokemon}>Remove</button>
        <img src={pokemon.sprites.front_default} alt={name}/>
        <p>{name}</p>
      </div>
    );
  }
}

export default Pokemon;
