import {ReactElement} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import UserContext from "./UserContext";

interface IWithChildren {
    children: ReactElement | ReactElement[];
}

/**
 * Inloggen op alle children toegankelijk geven
 */
export default function UserContextProvider({children}: IWithChildren) {
    //hook om de user in localstorage te zetten
    const [player, setPlayer] = useLocalStorage("player");

    const togglePlayer = () => {
        if (player == null) {
            setPlayer({email: "manager@ui3store.be", rol: "admin"})
        } else {
            setPlayer(null);
        }
    };

    return (
        <UserContext.Provider value={{player, togglePlayer}}>
            {children}
        </UserContext.Provider>
    );
}