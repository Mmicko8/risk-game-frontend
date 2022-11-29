import {ReactElement} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import UserContext from "./UserContext";
import {Player} from "../model/Player";

interface IWithChildren {
    children: ReactElement | ReactElement[];
}

/**
 * Inloggen op alle children toegankelijk geven
 */
export default function UserContextProvider({children}: IWithChildren) {
    const [player, setPlayer] = useLocalStorage<Player>("player", null);


    return (<UserContext.Provider value={{player, setPlayer}}>
            {children}
        </UserContext.Provider>
    );
}