import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import axios from "axios";
import Home from "./components/Home";
import {NavigationDial} from "./components/nav/NavigationDial";
import SignIn from "./components/identity/SignIn";
import Register from "./components/identity/Register";
import Game from "./components/Game";
import {QueryClient, QueryClientProvider} from "react-query";
import AccessTokenContextProvider from "./context/AccessContextProvider";
import localForage from "localforage";
import RegisterConfirmation from "./components/identity/RegisterConfirmation";
import {Lobby} from "./components/Lobby";
import Leaderboard from "./components/Leaderboard";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {green} from '@mui/material/colors';


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
// Add a request interceptor
axios.interceptors.request.use(async config => {
    // Do something before request is sent
    const accessToken = await localForage.getItem<string>("accessToken");
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

const queryClient = new QueryClient();
const theme = createTheme({
    palette: {
        secondary: {
            main: green[800],
            dark: green[900],
            light: green[600]
        },
    },
});


function App() {
    console.log("backend",process.env.REACT_APP_BACKEND_URL)

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AccessTokenContextProvider>
                    <BrowserRouter>
                        <NavigationDial/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/sign_in" element={<SignIn/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/game/:id" element={<Game/>}/>
                            <Route path="/registration_confirmation" element={<RegisterConfirmation/>}/>
                            <Route path="/lobby/:id" element={<Lobby/>}/>
                            <Route path="/leaderboard" element={<Leaderboard/>}/>
                        </Routes>
                    </BrowserRouter>
                </AccessTokenContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
