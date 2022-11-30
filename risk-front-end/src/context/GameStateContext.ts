import {createContext} from "react";
import {GameModel} from "../model/GameModel";


export interface IGameStateContext {
    game: GameModel;
}

export default createContext<IGameStateContext> ({game: {} as GameModel});