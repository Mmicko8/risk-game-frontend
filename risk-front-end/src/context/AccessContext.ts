import {createContext} from "react";

export interface IUserContext {
    accessToken: string | null;
    username: string | null;
    setAccessToken: (token: string) => void;
    setUsername: (username: string) => void;
    logout: () => void;
}

export default createContext<IUserContext>(
    {
        accessToken: null,
        username: null,
        setAccessToken: () => {},
        setUsername: () => {},
        logout: () => {}
    });
