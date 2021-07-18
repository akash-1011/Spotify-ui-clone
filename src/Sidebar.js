import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [{playlists}, dispatch] = useStateValue();

    return (
        <div className='sidebar'>
            <img className='sidebar-logo' src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'/>
            <SidebarOption Icon={HomeOutlinedIcon} title='Home'/>
            <SidebarOption Icon={SearchOutlinedIcon} title='Search'/>
            <SidebarOption Icon={LibraryMusicOutlinedIcon} title='Your Library'/>
            
            <br />
            <strong className='sidebar-title'>PLAYLISTS</strong>
            <hr />
            
            {playlists?.items?.map(playlist => (
                <SidebarOption title={playlist.name} />
            ))}
        </div>
    )
}

export default Sidebar
