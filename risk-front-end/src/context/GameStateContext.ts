import {createContext} from "react";
import {Game} from "../model/Game";


export interface IGameStateContext {
    game: Game;
}

export default createContext<IGameStateContext> ({game: {} as Game});