import {ReactElement} from "react";
import {Game} from "../model/Game";
import GameStateContext from "./GameStateContext";

interface GameStateContextProviderProps {
    children: ReactElement | ReactElement[];
    game: Game;
}

export default function GameStateContextProvider({game, children}: GameStateContextProviderProps) {

    return (<GameStateContext.Provider value={{game: game}}>
    {children}
    </GameStateContext.Provider>);
}