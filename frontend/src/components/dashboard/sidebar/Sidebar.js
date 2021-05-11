import React from "react";
import "./Sidebar.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Sidebar = () => {
    return (
        <div className='sidebar' >
            <div className="sidebar__top">
                <h3>Server 2</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;