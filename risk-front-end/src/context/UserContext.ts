import {createContext} from "react";
import {Player} from "../model/Player";

export interface IUserContext {
    player: Player;
    togglePlayer: () => void;
}

/**
 * default values for the context
 */
export default createContext<IUserContext>(
    {
        player: ({name: "admin", email: "test@gmail.com"} as Player),
        togglePlayer: () => {
        },
    });
