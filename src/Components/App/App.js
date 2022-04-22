
import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js'
import {Playlist} from '../Playlist/Playlist.js'
import {SearchResults} from '../SearchResults/SearchResults.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {name: 'boombaya', artist: 'Blackpink', album: 'How you like that', id:1},
        {name: 'whistle', artist: 'Blackpink', album: 'How you like that', id:2}
      ],
      playlistName: "K-pop songs",
      playlistTracks: [
        {name:'Butter', artist: 'BTS', album:'Boy wit Luv', id:4},
        {name:'Not Today', artist: 'BTS', album:'You never walk alone', id:5}
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => track.id === savedTrack.id)) {
      return false;
    } else {
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
  }

  removeTrack(track) {
    const result = this.state.playlistTracks.filter(savedTrack => track.id !== savedTrack.id);
    this.setState({playlistTracks: result});
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
