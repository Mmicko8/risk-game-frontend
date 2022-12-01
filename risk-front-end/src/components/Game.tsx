import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {getGameState, getPhaseNumber, Phases} from "../services/gameService";
import Loading from "./Loading";
import {Alert, Snackbar} from "@mui/material";
import {
    getAllAttackableTerritoryNamesFromGameState,
    getAllTerritoriesFromGameState,
    getOwnerOfTerritory,
    getTerritoryData
} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {SyntheticEvent, useContext, useState} from "react";
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
    const [isOpenSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [attackableTerritoryNames, setAttackableTerritoryNames] = useState<string[] | null>(null)

    const handleCloseSnackbar = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

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

        const territoryData = getTerritoryData(getAllTerritoriesFromGameState(game), territoryName);

        if (game.phase === Phases.REINFORCEMENT) {
            if (currentPlayerInGame.remainingTroopsToReinforce < 1) {
                setSnackBarMessage("No more troops remaining!")
                setOpenSnackBar(true);
                return;
            }
            setReinforceDialogOpen(true);
            setSelectedTerritory(territoryData);
        }

        if (game.phase === Phases.ATTACK) {
            if (territoryData!.troops < 2) {
                setSnackBarMessage("Territory must at least have 2 troops to attack!");
                setOpenSnackBar(true);
                return;
            }
            const attackableNeighborNameList = getAllAttackableTerritoryNamesFromGameState(game, territoryData!);
            setAttackableTerritoryNames(attackableNeighborNameList)
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
                        <Board selectTerritory={selectTerritory} territories={getAllTerritoriesFromGameState(game)}
                        attackableTerritoryNames={attackableTerritoryNames}/>
                    </GameStateContextProvider>
                </Grid>
                <Grid item xs={2}>
                    {game.playersInGame.map((playerInGame) => {
                        return <PlayerFrame playerInGame={playerInGame} key={playerInGame.playerInGameId}
                                            currentPlayerName={game.playersInGame[game.currentPlayer].player.username}/>
                    })}
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <CurrentPlayer nextPhase={nextPhase} nextTurn={nextTurn} currentPhase={getPhaseNumber(game.phase)}
                                   currentPlayer={game.playersInGame[game.currentPlayer]}/>
                </Grid>
            </Grid>
            <ReinforceDialog isOpen={isReinforceDialogOpen} onClose={() => setReinforceDialogOpen(false)}
                             onSubmit={reinforceTerritory} maxTroops={game.playersInGame[game.currentPlayer].remainingTroopsToReinforce}/>
            <Snackbar open={isOpenSnackBar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
