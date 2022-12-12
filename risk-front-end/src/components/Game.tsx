import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {GameActionType, getGameState, getPhaseNumber, Phases} from "../services/gameService";
import Loading from "./Loading";
import {Alert, Snackbar} from "@mui/material";
import {
    getAllTerritoriesFromGameState,
    getTerritoriesWithNeighbors,
} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {SyntheticEvent, useContext, useReducer} from "react";
import AccessContext from "../context/AccessContext";
import TroopSelector from "./TroopSelector";
import axios from "axios";
import PlayerFrame from "./Player/PlayerFrame";
import Grid from "@mui/material/Grid";
import CurrentPlayer from "./Player/CurrentPlayer";
import {GameInteractionStateReducer} from "../reducers/gameReducer";


export default function Game() {
    const queryClient = useQueryClient();
    const gameId = 1; // todo
    const {isLoading, isError, data: game} = useQuery(["game", gameId], () => getGameState(gameId));
    const {username} = useContext(AccessContext);
    const [state, dispatch] = useReducer(GameInteractionStateReducer, {
        isOpenErrorToast: false,
        errorToastMessage: "",
        selectedStartTerritory: null,
        selectedEndTerritory: null,
        troopState: {
            isOpen: false,
            buttonText: "",
            maxTroops: 0
        },
        attackableTerritoryNames: [],
        fortifiableTerritoryNames: []
    });

    const handleCloseSnackbar = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type: GameActionType.CLOSE_ERROR_TOAST});
    };

    if (isLoading) return <Loading/>;

    if (isError || !game) {
        return <Alert severity="error">Game state could not be loaded</Alert>;
    }

    // todo move axios calls to service
    const troopSelectorFunction = async (troops: number, action: string) => {
        dispatch({type: GameActionType.CLOSE_TROOP_SELECTOR});
        if (action === "Reinforce") {
            await axios.put(`/api/territory/${state.selectedStartTerritory?.territoryId}/placeTroops/${troops}`); // todo null check
            await queryClient.invalidateQueries(["game", gameId]);
        }
        if (action === "Attack") {
            const attackingTerritory = state.selectedStartTerritory;
            const defendingTerritory = state.selectedEndTerritory;
            if (!attackingTerritory || !defendingTerritory) throw new Error("Tried attacking but attacking or defending territory was not set");

            // todo defender amount
            const response = await axios.put('/api/game/attack', {gameId, attackerTerritoryName: attackingTerritory.name,
                defenderTerritoryName: defendingTerritory.name, amountOfAttackers: troops, amountOfDefenders: 1});
            await queryClient.invalidateQueries(["game", gameId]);

            let isTerritoryConquered = defendingTerritory.troops - response.data.defenderDices.length <= 0 &&
                response.data.amountOfSurvivingTroopsDefender === 0;
            if (!isTerritoryConquered) {
                dispatch({type: GameActionType.RESET_TERRITORY_STATE});
                return;
            }

            dispatch({type: GameActionType.ANNEXATION_FORTIFICATION});
        }
        if (action === "Fortify") {
            // todo add check if null instead of !
            await axios.put('/api/game/fortify', {gameId, territoryFrom: state.selectedStartTerritory!.name,
                territoryTo: state.selectedEndTerritory!.name, troops})
            await queryClient.invalidateQueries(["game", gameId]);
            dispatch({type: GameActionType.RESET_TERRITORY_STATE});
        }
    }

    const selectTerritory = async (e: any, territoryName: string) => {
        console.log(e, territoryName);
        const currentPlayerInGame = game.playersInGame[game.currentPlayerIndex];
        if (currentPlayerInGame.player.username !== username) return; // check if player has turn

        // get territories: with neighbors for Attack and Fortify | without neighbors for Reinforce
        let territories = game.phase === Phases.REINFORCEMENT ?
            getAllTerritoriesFromGameState(game) :
            await getTerritoriesWithNeighbors(game.gameId);

        dispatch({
            type: game.phase,
            payload: {
                game: game,
                selectedTerritoryName: territoryName,
                territories: territories
            }
        });
    }

    const nextPhase = async () => {
        await axios.put(`/api/game/${gameId}/nextPhase`)
        await queryClient.invalidateQueries(["game", gameId]);
        dispatch({type: GameActionType.RESET_TERRITORY_STATE});
    }

    const nextTurn = async () => {
        await axios.put(`/api/game/${gameId}/nextTurn`)
        await queryClient.invalidateQueries(["game", gameId]);
        dispatch({type: GameActionType.RESET_TERRITORY_STATE});
    }
    console.log(game);

    return (
        <>
            <Grid container display="flex" alignItems="center" justifyItems="center">
                {/*Renders the game board*/}
                <Grid item xs={10}>
                    <GameStateContextProvider game={game}>
                        <Board selectTerritory={selectTerritory} territories={getAllTerritoriesFromGameState(game)}
                        attackableTerritoryNames={state.attackableTerritoryNames} fortifiableTerritoryNames={state.fortifiableTerritoryNames}/>
                    </GameStateContextProvider>
                </Grid>
                {/*Shows info about all the players in the game (e.g. their color)*/}
                <Grid item xs={2}>
                    {game.playersInGame.map((playerInGame) => {
                        return <PlayerFrame playerInGame={playerInGame} key={playerInGame.playerInGameId}
                                            currentPlayerName={game.playersInGame[game.currentPlayerIndex].player.username}/>
                    })}
                </Grid>
                {/*Shows information about the current player (e.g. the phase he is in)*/}
                <Grid item xs={12} display="flex" justifyContent="center">
                    <CurrentPlayer nextPhase={nextPhase} nextTurn={nextTurn} currentPhase={getPhaseNumber(game.phase)}
                                   currentPlayer={game.playersInGame[game.currentPlayerIndex]}/>
                </Grid>
            </Grid>
            {/*Dialog component for selecting amount of troops for attack, fortify, etc.*/}
            <TroopSelector isOpen={state.troopState.isOpen} onClose={() => dispatch({type: GameActionType.CLOSE_TROOP_SELECTOR})}
                           onSubmit={troopSelectorFunction}
                           maxTroops={state.troopState.maxTroops}
                           confirmButtonText={state.troopState.buttonText}/>
            {/*Temporary message for displaying user errors (ex: when user tries to attack from territory with only 1 troop)*/}
            <Snackbar open={state.isOpenErrorToast} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {state.errorToastMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
