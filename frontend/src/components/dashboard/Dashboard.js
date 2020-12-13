import React from 'react';
import "./Dashboard.css";
import Sidebar from './Sidebar'
import Chat from './Chat'


function App() {
    return (
        <div className="app">
            <Sidebar/>
            <Chat/>
        </div>
    );
}

export default App;