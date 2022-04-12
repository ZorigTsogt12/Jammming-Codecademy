
import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js'
import {Playlist} from '../Playlist/Playlist.js'
import {SearchResults} from '../SearchResults/SearchResults.js'

class App extends React.Components {
  constructor(props) {
    super(props);
    this.state.searchResults = [];
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist />
          {/* <!-- Add a Playlist component --> */}
        </div>
      </div>
    </div>
    );
  }
}

export default App;
