import React, { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokentFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
import {useStateValue} from './StateProvider';

const spotify = new SpotifyWebApi();

function App() {

  const [{token},dispatch] = useStateValue()

  useEffect(() => {
    const hash = getTokentFromUrl();
    const _token = hash.access_token;
    window.location.hash = '';
    
    if(_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(_user => {
        dispatch({
          type: 'SET_USER',
          user: _user
        })
      });

      spotify.getUserPlaylists().then((_playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: _playlists
        })
      })

      spotify.getPlaylist('37i9dQZEVXcHCDWItKbt9Y').then(res => (
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly: res,
        })
      ))

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      )

    } 
    
  },[])

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
