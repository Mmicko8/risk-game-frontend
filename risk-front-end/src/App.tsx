import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import axios from "axios";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Lobby from "./components/Lobby";
import StoreAppBar from "./components/nav/StoreAppBar";
import {Navigation} from "./components/nav/Navigation";


axios.defaults.baseURL = "http://localhost:3001";
const queryClient = new QueryClient();

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <StoreAppBar onOpenDrawer={handleDrawerToggle}/>
                    <Navigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}/>
                    <Routes>
                        <Route path="/" element={<Lobby/>}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}

export default App;
