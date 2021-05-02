import React from 'react'
import './ChatHeader.css'
import NotificationsIcon from '@material-ui/icons/Notifications'
import EditLocationRounded from '@material-ui/icons/EditLocationRounded'
import PeopleAltRounded from '@material-ui/icons/PeopleAltRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'

const ChatHeader = ({ channelName }) => {
    return (
        <div className='chatHeader-reset' >
            <div className="chatHeader-reset__left">
                <h3><span className="chatHeader-reset__hash">#</span>
                    {channelName}
                    </h3>
            </div>

            <div className="chatHeader-reset__right">
                <NotificationsIcon />
                <EditLocationRounded />
                <PeopleAltRounded />

                <div className="chatHeader-reset__search">
                    <input type="text" placeholder='Search' />
                    <SearchRoundedIcon />
                </div>

                <SendRoundedIcon />
                <HelpRoundedIcon />
            </div>
        </div>
    )
}

export default ChatHeader