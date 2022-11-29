import {ReactElement} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import AccessContext from "./AccessContext";

interface IWithChildren {
    children: ReactElement | ReactElement[];
}

export default function AccessTokenContextProvider({children}: IWithChildren) {
    const [accessToken, setAccessToken] = useLocalStorage<string>("accessToken", null);

    return (<AccessContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AccessContext.Provider>
    );
}