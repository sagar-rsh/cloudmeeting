import React from 'react'
import './ChatHeader.css'
import { Button } from '@material-ui/core'

const ChatHeader = ({ channelName }) => {

    const onWhiteboardClick = () =>{
        window.open('/whiteboard', )
      };

      const onVideoScreenshareClick = () =>{
        window.open('/videoScreenshare', )
      };

    return (
        <div className='chatHeader-reset' >
            <div className="chatHeader-reset__left">
                <h3><span className="chatHeader-reset__hash">#</span>
                    {channelName}
                    </h3>
            </div>

            <div className="chatHeader-reset__board">
                <Button onClick={onWhiteboardClick}><div className="chatHeader-reset__board"> Whiteboard </div>  </Button>
                <Button onClick={onVideoScreenshareClick} className="chatHeader-reset_button"><div className="chatHeader-reset__board"> Video+Screenshare </div> </Button>
            </div>
        </div>
    )
}

export default ChatHeader