import { Avatar } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import React from 'react'
import './Header.css'
import { useStateValue } from './StateProvider'

function Header() {
    const [{user},dispatch] = useStateValue()
    return (
        <div className='header'>
            <div className='header-left'>
                <SearchOutlined />
                <input 
                    placeholder='Search for Artists, Songs, or Podcasts'
                    type='text'
                />
            </div>
            <div className='header-right'>
                <Avatar src={user?.images[0]?.url} alt={user?.display_name}/>
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header
