import Board from "./Board";
import {useQuery} from "react-query";
import {getGameState} from "../services/gameService";
import Loading from "./Loading";
import {Alert} from "@mui/material";
import {getAllTerritoriesFromGameState} from "../services/territoryService";

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

    return (
        <div style={{backgroundColor:"lightblue"}}>
            <Board selectCountry={selectCountry} territories={getAllTerritoriesFromGameState(game)}/>
        </div>
    );
}
