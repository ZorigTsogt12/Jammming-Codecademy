
import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {Playlist} from '../Playlist/Playlist.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Spotify} from '/Users/zozo/jamming/src/util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "K-pop songs",
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({playlistName: 'New Playlist', playlistTracks: []})
    });
  }

  search(term) {
    Spotify.search(term).then(trackArr => {
      this.setState({searchResults: trackArr});
    })
    
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
