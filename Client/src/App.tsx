import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import styles from './App.module.scss';
import Classnames from 'classnames';
import * as Common from './lib/common'
import { Login } from './components/login/login';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Folders } from './components/folders/folders';
import { Settings } from './components/settings/settings';

import { TaxList } from './components/tax-list/tax-list';


function App() {
    const [isConnected, setIsConnected] = useState('pending');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const Token = Common.getCookie('token');


    useEffect(() => {
        const ping = () => fetch('http://localhost:3000').then(() => setIsConnected('connected')).catch(() => setIsConnected('disconnected'));
        setInterval(ping, 5000), ping();

        if (!Token) return setIsLoggedIn(false);
        fetch(`http://localhost:3000/login?token=${Token}`, { method: 'GET' })
            .then((res) => res.json())
            .then((json) => {
                if (json.error) return alert(json.error);
                if (!json.valid) return setIsLoggedIn(false);
                else setIsLoggedIn(true);
            });
    }, []);


    if (isConnected === 'pending') return <div>Connecting to Server...</div>;
    if (isConnected === 'disconnected') return <div><p className='text-red-600'>Failed to Connect to Server!</p></div>;

    if (!isLoggedIn) return <Login setIsLoggedIn={setIsLoggedIn} />;

    else return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/folders" element={<Folders />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/tax-list" element={<TaxList />} />

                <Route path="/*" element={<div>404 Page not found</div>} />
            </Routes>
        </>
    );
}

export default App;