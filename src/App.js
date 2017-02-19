import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: null,
      apiItemsPerPage: 20,
    }
  }

  /**
   * Request data from Pokeapi.co
   */
  getApiData() {}

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
