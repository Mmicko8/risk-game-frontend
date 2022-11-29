import {ReactElement} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import AccessContext from "./AccessContext";

interface IWithChildren {
    children: ReactElement | ReactElement[];
}

export default function AccessTokenContextProvider({children}: IWithChildren) {
    const [username, setUsername, removeUsername] = useLocalStorage<string | null>("username", null);
    const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage<string | null>("accessToken", null);

    const logout = () => {
        removeUsername();
        removeAccessToken();
    }

    return (<AccessContext.Provider value={{accessToken, setAccessToken, username, setUsername, logout}}>
            {children}
        </AccessContext.Provider>
    );
}