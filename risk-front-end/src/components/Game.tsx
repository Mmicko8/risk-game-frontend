import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {getGameState, getPhaseNumber, Phases} from "../services/gameService";
import Loading from "./Loading";
import {Alert, Snackbar} from "@mui/material";
import {
    getAllAttackableTerritoryNamesFromGameState,
    getAllTerritoriesFromGameState,
    getTerritoryData
} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {SyntheticEvent, useContext, useState} from "react";
import AccessContext from "../context/AccessContext";
import TroopSelector from "./TroopSelector";
import axios from "axios";
import {TerritoryModel} from "../model/TerritoryModel";
import PlayerFrame from "./Player/PlayerFrame";
import Grid from "@mui/material/Grid";
import CurrentPlayer from "./Player/CurrentPlayer";
import {getMaxTroopsFromTroopCount} from "../services/attackService";

export default function Game() {
    // we know this component is too big, no time to refactor it before sprint 1
    const queryClient = useQueryClient();
    const gameId = 1; // todo
    const {isLoading, isError, data: game} = useQuery(["game", gameId], () => getGameState(gameId));
    const [isTroopSelectorOpen, setTroopSelectorOpen] = useState(false);
    const {username} = useContext(AccessContext);
    const [selectedOwnedTerritory, setSelectedOwnedTerritory] = useState<TerritoryModel | null>(null);
    const [territoryToAttack, setTerritoryToAttack] = useState<TerritoryModel | null>(null);
    const [isOpenSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [troopSelectorButtonText, setTroopSelectorButtonText] = useState("");
    const [troopSelectorMaxTroops, setTroopSelectorMaxTroops] = useState(0);
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
        setTroopSelectorOpen(false);
        await axios.put(`/api/territory/${selectedOwnedTerritory?.territoryId}/placeTroops/${troops}`);
        await queryClient.invalidateQueries(["game", gameId]);
        setSelectedOwnedTerritory(null);
    }

    const selectTerritory = (e: any, territoryName: string) => {
        console.log(e, territoryName);
        const currentPlayerInGame = game.playersInGame[game.currentPlayer];
        if (currentPlayerInGame.player.username !== username) return; // check if player has turn

        const territoryData = getTerritoryData(getAllTerritoriesFromGameState(game), territoryName);
        const ownerId = territoryData!.ownerId;

        if (game.phase === Phases.REINFORCEMENT) {
            if (ownerId !== currentPlayerInGame.playerInGameId) return;

            if (currentPlayerInGame.remainingTroopsToReinforce < 1) {
                setSnackBarMessage("No more troops remaining!")
                setOpenSnackBar(true);
                return;
            }
            setTroopSelectorMaxTroops(game.playersInGame[game.currentPlayer].remainingTroopsToReinforce);
            setTroopSelectorButtonText("Reinforce");
            setTroopSelectorOpen(true);
            setSelectedOwnedTerritory(territoryData);
        }

        if (game.phase === Phases.ATTACK) {
            // check if selected territory is your own territory, to attack from
            if (ownerId === currentPlayerInGame.playerInGameId) {
                if (territoryData!.troops < 2) {
                    setSnackBarMessage("Territory must at least have 2 troops to attack!");
                    setOpenSnackBar(true);
                    setAttackableTerritoryNames(null);
                    return;
                }
                setSelectedOwnedTerritory(territoryData);
                const attackableNeighborNameList = getAllAttackableTerritoryNamesFromGameState(game, territoryData!);
                setAttackableTerritoryNames(attackableNeighborNameList);
                return;
            }

            // if selected territory is not your own territory it will select it for attack
            const attackableTerritories = getAllAttackableTerritoryNamesFromGameState(game, selectedOwnedTerritory!);
            // check if selected territory to attack is attackable neighbor
            if (attackableTerritories.includes(territoryData!.name)) {
                setTerritoryToAttack(territoryData);
                setTroopSelectorMaxTroops(getMaxTroopsFromTroopCount(selectedOwnedTerritory!.troops));
                setTroopSelectorButtonText("Attack");
                setTroopSelectorOpen(true);
            }
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
            <TroopSelector isOpen={isTroopSelectorOpen} onClose={() => setTroopSelectorOpen(false)}
                           onSubmit={reinforceTerritory}
                           maxTroops={troopSelectorMaxTroops}
                           confirmButtonText={troopSelectorButtonText}/>
            <Snackbar open={isOpenSnackBar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
