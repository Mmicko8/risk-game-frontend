import {createContext} from "react";
import {Player} from "../model/Player";

export interface IUserContext {
    player: Player | null;
    setPlayer: (player: Player) => void;
}

/**
 * default values for the context
 */
export default createContext<IUserContext>(
    {
        player: null,
        setPlayer: () => {},
    });
