import {createContext} from "react";

export interface IUserContext {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
}

export default createContext<IUserContext>(
    {
        accessToken: null,
        setAccessToken: () => {},
    });
