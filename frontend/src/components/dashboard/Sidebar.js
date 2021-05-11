import React from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import { Avatar} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth } from './firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from './../../axios'
import Pusher from 'pusher-js'

const pusher = new Pusher('6ee0d2c0c8adc5cff9da', {
    cluster: 'ap2'
    });

const Sidebar = () => {

    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([])
    const [component, showComponent] = useState(false)

    const getChannels = () => {
        axios.get('/get/channelList')
            .then((res) => {
                setChannels(res.data)
            })
    }

    useEffect(() => {
        getChannels()

        var channel = pusher.subscribe('channels');
        channel.bind('newChannel', function(data) {
            getChannels()
    });

    }, [])

    const handleAddChannel = (e) => {
        e.preventDefault()

        const channelName = prompt('Enter a new channel name')

        if (channelName) {
            axios.post('/new/channel', {
                channelName: channelName
            })

        }
    }

    return (
        <div className='sidebar-reset' >
            <div className="sidebar-reset__top">
                <h3>Welcome</h3>
            </div>

            <div className="sidebar-reset__channels">
                <div className="sidebar-reset__channelsHeader">
                    <div className="sidebar-reset__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className='sidebar-reset__addChannel' />
                </div>
                <div className="sidebar-reset__channelsList">
                    {
                        channels.map(channel => (
                            <SidebarChannel key={channel.id} id={channel.id} channelName={channel.name} />
                        ))
                    }
                </div>
            </div>

            {/* <div className="sidebar-feature">
                <Button onClick={onWhiteboardClick}>Whiteboard</Button>
                <Button onClick={onVideoScreenshareClick}>Video + Screenshare</Button>
            </div> */}

            <div className="sidebar-reset__voice">
                <SignalCellularAltIcon className='sidebar-reset__voiceIcons' fontSize='large' />
                <div className="sidebar-reset__voiceInfo">
                    <h3>Status: Online</h3>
                </div>
            </div>
            <div className="sidebar-reset__profile">
            <Avatar src={user.photo} onClick={() => auth.signOut()} />
                <div className="sidebar-reset__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar