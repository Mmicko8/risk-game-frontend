import Board from "./Board";
import {useQuery} from "react-query";
import {getGameState} from "../services/gameService";
import Loading from "./Loading";
import {Alert} from "@mui/material";
import {getAllTerritoriesFromGameState} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";

export default function Game() {
    const selectCountry = (e: any, country: string) => {
        console.log(e, country);
    }

    const gameId = 1; // todo
    const {isLoading, isError, data: game} = useQuery(["board", gameId], () => getGameState(gameId));


    if (isLoading) return <Loading/>;

    if (isError || !game) {
        return <Alert severity="error">Game state could not be loaded</Alert>;
    }
    console.log(game);

    return (
        <div style={{backgroundColor: "lightblue"}}>
            <GameStateContextProvider game={game}>
                <Board selectCountry={selectCountry} territories={getAllTerritoriesFromGameState(game)}/>
            </GameStateContextProvider>
        </div>
    );
}
