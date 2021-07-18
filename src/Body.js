import { FavoriteOutlined, MoreHoriz, PlayCircleFilled } from '@material-ui/icons'
import React from 'react'
import './Body.css'
import Header from './Header'
import SongRow from './SongRow'
import { useStateValue } from './StateProvider'

function Body({spotify}) {
    const [{discover_weekly},dispatch] = useStateValue()

    const playPlaylist = (id) => {
        spotify
          .play({
            context_uri: `spotify:playlist:37i9dQZEVXcHCDWItKbt9Y`,
          })
          .then((res) => {
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
          });
      };

      const playSong = (id) => {
        console.log(id)
        spotify
          .play({
            uris: [`spotify:track:${id}`],
          })
          .then((res) => {
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
          });
      };

    return (
        <div className='body'>
            <Header spotify={spotify}/>

            <div className='body-info'>
                <img src={discover_weekly?.images[0].url} alt=''/>
                <div className='body-infoText'>
                    <strong>PLAYLIST</strong>
                    <h2>Discover weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>

            <div className='body-songs'>
                <div className='body-icons'>
                    <PlayCircleFilled onClick={playPlaylist} className='body-shuffle'/>
                    <FavoriteOutlined className='body-iconsSmall' fontSize='large'/>
                    <MoreHoriz className='body-iconsSmall' />
                </div>
                {discover_weekly?.tracks.items.map(item => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body
