import React, { Component, PropTypes } from 'react';

import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Search Form';
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    return (
      <form className="SearchForm">
        <label htmlFor="" className="SearchForm__label"></label>
        <input type="search" className="SearchForm__input" placeholder="Search Pokémon" />
      </form>
    );
  }
}

export default SearchForm;
