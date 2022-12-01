import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {getGameState, getPhaseNumber, Phases} from "../services/gameService";
import Loading from "./Loading";
import {Alert} from "@mui/material";
import {getAllTerritoriesFromGameState, getOwnerOfTerritory, getTerritoryData} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {useContext, useState} from "react";
import AccessContext from "../context/AccessContext";
import ReinforceDialog from "./ReinforceDialog";
import axios from "axios";
import {TerritoryModel} from "../model/TerritoryModel";
import PlayerFrame from "./Player/PlayerFrame";
import Grid from "@mui/material/Grid";
import CurrentPlayer from "./Player/CurrentPlayer";

export default function Game() {
    const queryClient = useQueryClient();
    const gameId = 1; // todo
    const {isLoading, isError, data: game} = useQuery(["game", gameId], () => getGameState(gameId));
    const [isReinforceDialogOpen, setReinforceDialogOpen] = useState(false);
    const {username} = useContext(AccessContext);
    const [selectedTerritory, setSelectedTerritory] = useState<TerritoryModel | null>(null);

    if (isLoading) return <Loading/>;

    if (isError || !game) {
        return <Alert severity="error">Game state could not be loaded</Alert>;
    }

    const reinforceTerritory = async (troops: number) => {
        setReinforceDialogOpen(false);
        await axios.put(`/api/territory/${selectedTerritory?.territoryId}/placeTroops/${troops}`);
        await queryClient.invalidateQueries(["game", gameId]);
    }

    const selectTerritory = (e: any, territoryName: string) => {
        console.log(e, territoryName);
        const currentPlayerInGame = game.playersInGame[game.currentPlayer];
        if (currentPlayerInGame.player.username !== username) return;

        const ownerId = getOwnerOfTerritory(game, territoryName);
        if (!ownerId || currentPlayerInGame.playerInGameId !== ownerId) return;

        if (game.phase === Phases.REINFORCEMENT) {
            console.log("reinforce");
            setReinforceDialogOpen(true);
            setSelectedTerritory(getTerritoryData(getAllTerritoriesFromGameState(game), territoryName));
        }
    }

    const nextPhase = async () => {
        await axios.put(`/api/game/${gameId}/nextPhase`)
        await queryClient.invalidateQueries(["game", gameId]);
    }

    const nextTurn = async () => {
        await axios.put(`/api/game/${gameId}/nextTurn`)
        await queryClient.invalidateQueries(["game", gameId]);
    }
    console.log(game);

    return (
        <>
            <Grid container display="flex" alignItems="center" justifyItems="center">
                <Grid item xs={10}>
                    <GameStateContextProvider game={game}>
                        <Board selectTerritory={selectTerritory} territories={getAllTerritoriesFromGameState(game)}/>
                    </GameStateContextProvider>
                </Grid>
                <Grid item xs={2}>
                    {game.playersInGame.map((playerInGame) => {
                        return <PlayerFrame playerInGame={playerInGame}
                                            currentPlayerName={game.playersInGame[game.currentPlayer].player.username}/>
                    })}
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <CurrentPlayer nextPhase={nextPhase} nextTurn={nextTurn} currentPhase={getPhaseNumber(game.phase)}
                                   currentPlayer={game.playersInGame[game.currentPlayer]}/>
                </Grid>
            </Grid>
            {/*TODO fix maxTroops*/}
            <ReinforceDialog isOpen={isReinforceDialogOpen} onClose={() => setReinforceDialogOpen(false)}
                             onSubmit={reinforceTerritory} maxTroops={20}/>
        </>
    );
}
