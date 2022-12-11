import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {GameActionType, getGameState, getPhaseNumber, Phases} from "../services/gameService";
import Loading from "./Loading";
import {Alert, Snackbar} from "@mui/material";
import {
    getAllTerritoriesFromGameState,
    getTerritoriesWithNeighbors,
    getTerritoryData
} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {SyntheticEvent, useContext, useReducer} from "react";
import AccessContext from "../context/AccessContext";
import TroopSelector from "./TroopSelector";
import axios from "axios";
import {TerritoryModel} from "../model/TerritoryModel";
import PlayerFrame from "./Player/PlayerFrame";
import Grid from "@mui/material/Grid";
import CurrentPlayer from "./Player/CurrentPlayer";
import {
    getAttackableTerritoryNames,
    getMaxTroopsForAttack
} from "../services/attackService";
import {getFortifiableTerritoryNames} from "../services/fortifyService";
import {GameModel} from "../model/GameModel";

interface TroopSelectorState {
    isOpen: boolean;
    buttonText: string;
    maxTroops: number;
}

// todo rename to something more logical
interface MetaState {
    isOpenErrorToast: boolean;
    errorToastMessage: string;
    selectedStartTerritory: TerritoryModel | null;
    selectedEndTerritory: TerritoryModel | null;
    troopState: TroopSelectorState;
    attackableTerritoryNames: string[];
    fortifiableTerritoryNames: string[];
}

interface GameAction {
    type: string;
    payload?: {
        game: GameModel; // BEWARE: contains territories BUT WITHOUT neighbors, use 'territories' from payload instead
        selectedTerritoryName: string;
        territories: TerritoryModel[]; // contains neighbors when necessary (e.g. attack or fortify, NOT for reinforce)
    };
}


function metaGameStateReducerWithoutPayload(state: MetaState, action: GameAction) {
    switch (action.type) {
        case GameActionType.CLOSE_TROOP_SELECTOR:
            return {...state, troopState: {...state.troopState, isOpen: false}};

        case GameActionType.RESET_TERRITORY_STATE:
            return {...state,
                selectedStartTerritory: null,
                selectedEndTerritory: null,
                attackableTerritoryNames: [],
                fortifiableTerritoryNames: []
            };

        case GameActionType.CLOSE_ERROR_TOAST:
            return {...state, isOpenErrorToast: false};

        case GameActionType.ANNEXATION_FORTIFICATION:
            return {...state,
                troopState: {
                    maxTroops: state.selectedStartTerritory!.troops - 1,
                    buttonText: "Fortify",
                    isOpen: true,
                }
            };
        default:
            return null;
    }
}


function metaGameStateReducer(state: MetaState, action: GameAction) {
    const result = metaGameStateReducerWithoutPayload(state, action);
    if (result) return result;

    if (!action.payload) return state;
    const pl = action.payload;
    const currentPlayer = pl.game.playersInGame[pl.game.currentPlayerIndex];

    const selectedTerritory = getTerritoryData(pl.territories, pl.selectedTerritoryName);
    if (!selectedTerritory) return state;

    switch (action.type) {
        case GameActionType.REINFORCEMENT:
            // player doesn't own selected territory => cant reinforce
            if (selectedTerritory.ownerId !== currentPlayer.playerInGameId) return state;

            // check if player has enough troops to be able to reinforce
            if (currentPlayer.remainingTroopsToReinforce < 1) return {...state,
                errorToastMessage: "No more troops remaining!",
                isOpenErrorToast: true
            }

            return {...state,
                selectedStartTerritory: selectedTerritory,
                troopState: {
                    maxTroops: currentPlayer.remainingTroopsToReinforce,
                    buttonText: "Reinforce",
                    isOpen: true
                }
            }


        case GameActionType.ATTACK:
            // check if selected territory is your own territory, to attack from
            if (selectedTerritory.ownerId === currentPlayer.playerInGameId) {
                // can't attack if territory has less than 2 troops
                if (selectedTerritory.troops < 2) return {...state,
                    errorToastMessage: "Territory must at least have 2 troops to attack!",
                    isOpenErrorToast: true,
                    attackableTerritoryNames: []
                }; // todo check if works with empty array or if NULL should be used

                return {...state,
                    selectedStartTerritory: selectedTerritory,
                    attackableTerritoryNames: getAttackableTerritoryNames(pl.territories, selectedTerritory)
                };
            }

            // if selected territory is not your own territory it will select it for attack, unless startTerritory is null
            if (!state.selectedStartTerritory) return state;

            // check if selected territory to attack is attackable neighbor
            const attackableTerritoryNames = getAttackableTerritoryNames(pl.territories, state.selectedStartTerritory);
            if (!attackableTerritoryNames.includes(selectedTerritory.name)) return state;

            // todo TEST what happens when selectedStartTerritory is null (not selected)
            return {...state,
                selectedEndTerritory: selectedTerritory,
                troopState: {
                    maxTroops: getMaxTroopsForAttack(state.selectedStartTerritory.troops),
                    buttonText: "Attack",
                    isOpen: true
                }

            }


        case GameActionType.FORTIFICATION:
            if (selectedTerritory.ownerId !== currentPlayer.playerInGameId) return state;

            if (!state.selectedStartTerritory) {
                if (selectedTerritory.troops < 2) return {...state,
                    errorToastMessage: "Territory must at least have 2 troops to fortify!",
                    isOpenErrorToast: true,
                    fortifiableTerritoryNames: []
                };

                return {...state,
                    selectedStartTerritory: selectedTerritory,
                    fortifiableTerritoryNames: getFortifiableTerritoryNames(pl.territories, selectedTerritory),
                }
            }
            // if selected territory is not your own territory it will select it for fortification

            // check if selected territory to attack is fortifiable neighbor
            const fortifiableTerritoryNames = getFortifiableTerritoryNames(pl.territories, state.selectedStartTerritory);
            if (!fortifiableTerritoryNames.includes(selectedTerritory.name)) return state;

            return {...state,
                selectedEndTerritory: selectedTerritory,
                troopState: {
                    maxTroops: state.selectedStartTerritory.troops - 1,
                    buttonText: "Fortify",
                    isOpen: true
                }
            }


        default: return state;
    }
}


export default function Game() {
    const queryClient = useQueryClient();
    const gameId = 1; // todo
    const {isLoading, isError, data: game} = useQuery(["game", gameId], () => getGameState(gameId));
    const {username} = useContext(AccessContext);
    const [state, dispatch] = useReducer(metaGameStateReducer, {
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
