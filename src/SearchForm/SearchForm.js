import React, { Component, PropTypes } from 'react';

import Awesomplete from 'awesomplete';

import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Search Form';
    this.addPokemon = this.addPokemon.bind(this);
  }

  static contextTypes = {
    addPokemonToUserList: PropTypes.func,
  }

  componentDidMount() {
    this.awesomplete = new Awesomplete(this.refs.searchInput, {
      list: this.props.data,
      minChars: 3,
      autoFirst: true,
    });
  }

  addPokemon(e) {
    e.preventDefault();
    const { searchInput } = this.refs;

    this.context.addPokemonToUserList(searchInput.value);
    searchInput.value = '';
  }

  render() {
    return (
      <form className="SearchForm" onSubmit={this.addPokemon}>
        <label htmlFor="searchInput" className="SearchForm__label">Use this form to add a Pokémon to your list</label>
        <div className="SearchForm__fieldset">
          <input type="search" ref="searchInput" id="searchInput" className="SearchForm__input" placeholder="Pokémon name" />
          <button className="SearchForm__submit" type="submit">Go</button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
