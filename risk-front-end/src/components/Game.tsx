import Board from "./Board";
import {useQuery} from "react-query";
import {getGameState, Phases} from "../services/gameService";
import Loading from "./Loading";
import {Alert} from "@mui/material";
import {getAllTerritoriesFromGameState} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {useContext, useState} from "react";
import AccessContext from "../context/AccessContext";
import ReinforceDialog from "./ReinforceDialog";


export default function Game() {
    const gameId = 1; // todo
    const {isLoading, isError, data: game} = useQuery(["board", gameId], () => getGameState(gameId));
    const [isReinforceDialogOpen, setReinforceDialogOpen] = useState(false);
    const {username} = useContext(AccessContext);

    if (isLoading) return <Loading/>;

    if (isError || !game) {
        return <Alert severity="error">Game state could not be loaded</Alert>;
    }

    const selectCountry = (e: any, country: string) => {
        console.log(e, country);
        const currentPlayerInGame = game.playersInGame[game.currentPlayer];
        if (currentPlayerInGame.player.userName !== username) return;

        if (game.phase === Phases.REINFORCEMENT) {
            console.log("reinforce");
            setReinforceDialogOpen(true);
        }
    }
    console.log(game);

    return (
        <>
            <div style={{backgroundColor: "lightblue"}}>
                <GameStateContextProvider game={game}>
                    <Board selectCountry={selectCountry} territories={getAllTerritoriesFromGameState(game)}/>
                </GameStateContextProvider>
            </div>
            <ReinforceDialog isOpen={isReinforceDialogOpen} onClose={() => setReinforceDialogOpen(false)}
                             onSubmit={() => console.log("submitted reinforce")}/>
        </>
    );
}
