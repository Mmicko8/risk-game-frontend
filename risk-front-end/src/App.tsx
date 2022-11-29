import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import axios from "axios";
import Lobby from "./components/Lobby";
import NavBar from "./components/nav/NavBar";
import {Navigation} from "./components/nav/Navigation";
import SignIn from "./components/identity/SignIn";
import Register from "./components/identity/Register";
import Game from "./components/Game";
import {QueryClient, QueryClientProvider} from "react-query";
import AccessTokenContextProvider from "./context/AccessContextProvider";
import localForage from "localforage";
// import localforage from "localforage";


axios.defaults.baseURL = "http://localhost:8080";
// Add a request interceptor
axios.interceptors.request.use(async config => {
    // Do something before request is sent
    const accessToken = await localForage.getItem<string>("accessToken");
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error =>  {
    // Do something with request error
    return Promise.reject(error);
});

const queryClient = new QueryClient();

// localforage.config({
//     driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
//     name        : 'riskForage',
//     version     : 1.0,
//     size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
//     storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
//     description : 'Local Storage DB for risk app'
// });

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AccessTokenContextProvider>
                <BrowserRouter>
                    <NavBar onOpenDrawer={handleDrawerToggle}/>
                    <Navigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}/>
                    <Routes>
                        <Route path="/" element={<Lobby/>}/>
                        <Route path="/sign_in" element={<SignIn/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/game" element={<Game/>}/>
                    </Routes>
                </BrowserRouter>
            </AccessTokenContextProvider>
        </QueryClientProvider>
    );
}

export default App;
