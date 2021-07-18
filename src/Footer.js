import React, { useEffect } from 'react'
import './Footer.css'
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import { Grid, Slider } from '@material-ui/core';
import { PauseCircleOutlineOutlined, PlaylistPlay, VolumeDown } from '@material-ui/icons';
import {useStateValue} from './StateProvider';

function Footer({spotify}) {
    const [{token,item,playing}, dispatch] = useStateValue()

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
            console.log(r);
      
            dispatch({
              type: "SET_PLAYING",
              playing: r.is_playing,
            });
      
            dispatch({
              type: "SET_ITEM",
              item: r.item,
            });
          });
    },[spotify])

    const handlePlayPause = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };
    
      const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };
    
      const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };

    return (
        <div className='footer'>
            <div className='footer-left'>
                <img className='footer-albumLogo' src={item?.album.images[0].url} alt={item?.name}/>
                {item ? <div className='footer-songInfo'>
                    <h4>{item.name}</h4>
                    <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                </div> : <div className='footer-songInfo'>
                    <h4>No song is playing</h4>
                    <p>...</p>
                </div>}
            </div>
            <div className='footer-center'>
                <ShuffleIcon className='footer-green' />
                <SkipPreviousIcon onClick={skipNext} className='footer-icon' />
                { playing ? <PauseCircleOutlineOutlined onClick={handlePlayPause} fontSize="large" className='footer-icon' /> 
                    : <PlayCircleOutlineOutlinedIcon onClick={handlePlayPause} fontSize="large" className='footer-icon' />}
                <SkipNextIcon onClick={skipPrevious} className='footer-icon' />
                <RepeatIcon className='footer-green'/>
            </div>
            <div className='footer-right'>
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay className='footer-icon' />
                    </Grid>
                    <Grid item>
                        <VolumeDown className='footer-icon' />
                    </Grid>
                    <Grid item xs>
                        <Slider className='footer-icon' />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
