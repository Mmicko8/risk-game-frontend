import Board from "./Board";
import {useQuery} from "react-query";
import {getGameState} from "../services/gameService";
import Loading from "./Loading";
import {Alert} from "@mui/material";
import {getAllTerritoriesFromGameState} from "../services/territoryService";
import PlayerFrame from "./PlayerFrame";
import Grid from "@mui/material/Grid";

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
        <Grid container>
            <Grid item xs={10}>
                <Board selectCountry={selectCountry} territories={getAllTerritoriesFromGameState(game)}/>
            </Grid>
            <Grid item xs={2}>
                <PlayerFrame/>
            </Grid>
        </Grid>
    );
}
