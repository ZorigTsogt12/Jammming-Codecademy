let userAccessToken;
const client_id = 'bd84b203245d47289491f9d1deb37fbf';
const redirect_uri = 'http://localhost:3000/';

const Spotify = { 
    
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken
        } else {
            const current_url = window.location.href;
            const regexToken =  /access_token=([^&]*)/;
            const regexExpiry = /expires_in=([^&]*)/;
            let accessToken = current_url.match(regexToken);
            let expiryMatch = current_url.match(regexExpiry);

            if (accessToken && expiryMatch) {
                userAccessToken = accessToken['1'];
                let expiration_time = expiryMatch['1'];
                window.setTimeout(() => userAccessToken = '', expiration_time * 1000);
                window.history.pushState('Access Token', null, '/');
                return userAccessToken;
            } else if(!userAccessToken && !accessToken && !expiryMatch) {
                const spotify_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
                window.location.assign(spotify_url);
            }
            
        }
    }, 

    search(searchTerm) {

        return new Promise(resolve => {
            fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
                method: 'GET',
                headers: {Authorization: `Bearer ${this.getAccessToken()}`}
            }).then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error('Request Failed')
            }).then(tracksJson => {
                if(tracksJson) {
                    const trackArr = tracksJson.tracks.items.map(track => {return {id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri}})
                    resolve(trackArr)
                } else {
                    resolve([]);
                }
            })
        }) 
    },

    savePlaylist(playlistName, trackURIs) {
        if(playlistName && trackURIs) {
            let accessToken = userAccessToken;
            let headers = {Authorization: `Bearer${userAccessToken}`}
            let userID = ''

            fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Request Failed for fetching user ID');
            })
            .then(userData => {
                userID = userData.id
                fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    method: 'POST',
                    headers: headers,
                    body: {
                        name: playlistName,
                        public: false
                    }
                })
                .then(response => {
                    if(response.ok) {
                        return response.json();
                    }
                    throw new Error('Request failed for new playlist')
                })
                .then(playlist => {
                    let playlistID = playlist.id
                    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        method: 'POST',
                        headers: headers,
                        body: {
                            uris: trackURIs,
                            position: 0
                        }
                    })
                    .then(response => {
                        if(response.ok) {
                            return response.json();
                        }
                        throw new Error('Request failed for adding tracks');
                    })
                    .then(tracks => {
                        let snapshotID = tracks.snapshop_id;
                    })
                })
            })
        } else {
            return false;
        }
    }
};


export {Spotify};