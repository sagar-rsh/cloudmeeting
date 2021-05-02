import React from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import { Avatar, Button } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth } from './firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from './../../axios'
import Pusher from 'pusher-js'
import Container from  '../whiteboard/container/Container';
import { Link, Route, Switch } from "react-router-dom";

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

    const onWhiteboardClick = () =>{
        window.open('/whiteboard', )
      };

      const onVideoScreenshareClick = () =>{
        window.open('/videoScreenshare', )
      };

    return (
        <div className='sidebar-reset' >
            <div className="sidebar-reset__top">
                <h3>Server 2</h3>
                <ExpandMoreIcon />
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

            <div className="sidebar-feature">
                <Button onClick={onWhiteboardClick}>Whiteboard</Button>
                <Button onClick={onVideoScreenshareClick}>Video + Screenshare</Button>
            </div>

            <div className="sidebar-reset__voice">
                <SignalCellularAltIcon className='sidebar-reset__voiceIcons' fontSize='large' />
                <div className="sidebar-reset__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar-reset__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
            <div className="sidebar-reset__profile">
            <Avatar src={''} onClick={() => auth.signOut()} />
                <div className="sidebar-reset__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

                <div className="sidebar-reset__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar