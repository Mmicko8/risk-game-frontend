import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {getGameState, getPhaseNumber, Phase} from "../services/gameService";
import Loading from "./Loading";
import {Alert, Snackbar} from "@mui/material";
import {
    getAllTerritoriesFromGameState,
    getTerritoriesWithNeighbors,
    getTerritoryData
} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {SyntheticEvent, useContext, useReducer, useState} from "react";
import AccessContext from "../context/AccessContext";
import TroopSelector from "./TroopSelector";
import axios from "axios";
import {TerritoryModel} from "../model/TerritoryModel";
import PlayerFrame from "./Player/PlayerFrame";
import Grid from "@mui/material/Grid";
import CurrentPlayer from "./Player/CurrentPlayer";
// todo rename to generic thing, cuz fortify uses it too
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
    type: Phase;
    payload: {
        game: GameModel; // BEWARE: contains territories BUT WITHOUT neighbors, use 'territories' from payload instead
        selectedTerritoryName: string;
        territories: TerritoryModel[]; // contains neighbors when necessary (e.g. attack or fortify, NOT for reinforce)
    };
}


function reducer(state: MetaState, action: GameAction) {
    const pl = action.payload;
    const currentPlayer = pl.game.playersInGame[pl.game.currentPlayerIndex];

    const selectedTerritory = getTerritoryData(pl.territories, pl.selectedTerritoryName);
    if (!selectedTerritory) return state;

    switch (action.type) {
        case Phase.REINFORCEMENT:
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


        case Phase.ATTACK:
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


        case Phase.FORTIFICATION:
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

            // if selected territory is not your own territory it will select it for fortification, unless startTerritory is null
            if (!state.selectedStartTerritory) return state;

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
    const [isTroopSelectorOpen, setTroopSelectorOpen] = useState(false);
    const {username} = useContext(AccessContext);
    const [selectedOwnedTerritory, setSelectedOwnedTerritory] = useState<TerritoryModel | null>(null);
    const [territoryToAttackOrFortify, setTerritoryToAttackOrFortify] = useState<TerritoryModel | null>(null);
    const [isOpenSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [troopSelectorButtonText, setTroopSelectorButtonText] = useState("");
    const [troopSelectorMaxTroops, setTroopSelectorMaxTroops] = useState(0);
    const [attackableTerritoryNames, setAttackableTerritoryNames] = useState<string[] | null>(null);
    const [fortifiableTerritoryNames, setFortifiableTerritoryNames] = useState<string[] | null>(null);

    const [state, dispatch] = useReducer(reducer, {
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
        setOpenSnackBar(false);
    };

    if (isLoading) return <Loading/>;

    if (isError || !game) {
        return <Alert severity="error">Game state could not be loaded</Alert>;
    }

    const resetTerritoryStates = () => {
        setSelectedOwnedTerritory(null);
        setTerritoryToAttackOrFortify(null);
        setFortifiableTerritoryNames(null);
        setAttackableTerritoryNames(null);
    }
    //TODO: check useReducer

    const troopSelectorFunction = async (troops: number, action: string) => {
        setTroopSelectorOpen(false);
        if (action === "Reinforce") {
            await axios.put(`/api/territory/${selectedOwnedTerritory?.territoryId}/placeTroops/${troops}`);
            await queryClient.invalidateQueries(["game", gameId]);
        }
        if (action === "Attack") {
            const response = await axios.put('/api/game/attack', {gameId, attackerTerritoryName: selectedOwnedTerritory!.name,
                defenderTerritoryName: territoryToAttackOrFortify!.name, amountOfAttackers: troops, amountOfDefenders: 1});
            await queryClient.invalidateQueries(["game", gameId]);
            console.log(response.data)
            //TODO: fix selectedOwnedTerritory to maybe be null after a successful attack
            if (territoryToAttackOrFortify!.troops - response.data.defenderDices.length <= 0 && response.data.amountOfSurvivingTroopsDefender === 0) {
                setTroopSelectorButtonText("Fortify");
                setTroopSelectorMaxTroops(getTerritoryData(getAllTerritoriesFromGameState(game),
                    selectedOwnedTerritory!.name)!.troops -1)
                setTroopSelectorOpen(true);
            } else {
                resetTerritoryStates();
            }
        }
        if (action === "Fortify") {
            console.log(selectedOwnedTerritory)
            console.log("im here")
            await axios.put('/api/game/fortify', {gameId, territoryFrom: selectedOwnedTerritory!.name,
                territoryTo: territoryToAttackOrFortify!.name, troops})
            await queryClient.invalidateQueries(["game", gameId]);
            resetTerritoryStates();
        }
    }

    const selectTerritory = async (e: any, territoryName: string) => {
        console.log(e, territoryName);
        const currentPlayerInGame = game.playersInGame[game.currentPlayerIndex];
        if (currentPlayerInGame.player.username !== username) return; // check if player has turn

        // get territories: with neighbors for Attack and Fortify | without neighbors for Reinforce
        let territories = game.phase === Phase.REINFORCEMENT ?
            getAllTerritoriesFromGameState(game) :
            await getTerritoriesWithNeighbors(game.gameId);

        dispatch({
            type: game.phase as Phase,
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
        resetTerritoryStates();
    }

    const nextTurn = async () => {
        await axios.put(`/api/game/${gameId}/nextTurn`)
        await queryClient.invalidateQueries(["game", gameId]);
        resetTerritoryStates();
    }
    console.log(game);

    return (
        <>
            <Grid container display="flex" alignItems="center" justifyItems="center">
                {/*Renders the game board*/}
                <Grid item xs={10}>
                    <GameStateContextProvider game={game}>
                        <Board selectTerritory={selectTerritory} territories={getAllTerritoriesFromGameState(game)}
                        attackableTerritoryNames={attackableTerritoryNames} fortifiableTerritoryNames={fortifiableTerritoryNames}/>
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
            <TroopSelector isOpen={isTroopSelectorOpen} onClose={() => setTroopSelectorOpen(false)}
                           onSubmit={troopSelectorFunction}
                           maxTroops={troopSelectorMaxTroops}
                           confirmButtonText={troopSelectorButtonText}/>
            {/*Temporary message for displaying user errors (ex: when user tries to attack from territory with only 1 troop)*/}
            <Snackbar open={isOpenSnackBar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
