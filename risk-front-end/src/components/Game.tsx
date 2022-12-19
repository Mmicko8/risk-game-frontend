import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {
    exchangeCards,
    GameActionType,
    getGameState,
    getPhaseNumber,
    nextPhase,
    nextTurn,
    Phases
} from "../services/gameService";
import Loading from "./Loading";
import {Alert, Snackbar} from "@mui/material";
import {
    getAllTerritoriesFromGameState,
    getTerritoriesWithNeighbors, placeTroops,
} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {SyntheticEvent, useContext, useReducer} from "react";
import AccessContext from "../context/AccessContext";
import TroopSelector from "./dialogs/TroopSelector";
import PlayerFrame from "./Player/PlayerFrame";
import Grid from "@mui/material/Grid";
import CurrentPlayer from "./Player/CurrentPlayer";
import {GameInteractionStateReducer} from "../reducers/gameReducer";
import {useParams} from "react-router-dom";
import Fab from "@mui/material/Fab";
import CardsIcon from '@mui/icons-material/Style';
import CardSelector from "./dialogs/CardSelector/CardSelector";
import {attack, attackerCanStillAttack, isTerritoryConquered} from "../services/attackService";
import { fortify } from "../services/fortifyService";
import {AttackResult} from "../model/AttackResult";


export default function Game() {
    const queryClient = useQueryClient();
    const {id} = useParams<{ id: string }>()
    const gameId = parseInt(id!);
    const {isLoading, isError, data: game} = useQuery(["game", gameId], () => getGameState(gameId));
    const {username} = useContext(AccessContext);
    const [state, dispatch] = useReducer(GameInteractionStateReducer, {
        isOpenErrorToast: false,
        errorToastMessage: "",
        isOpenCardSelector: false,
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

    const troopSelectorFunction = async (troops: number, action: string) => {
        if (action === "Reinforce") {
            dispatch({type: GameActionType.CLOSE_TROOP_SELECTOR});
            await placeTroops(state.selectedStartTerritory!.territoryId, troops);
            await queryClient.invalidateQueries(["game", gameId]);
        }
        else if (action === "Attack") {
            const attacker = state.selectedStartTerritory;
            const defender = state.selectedEndTerritory;
            if (!attacker || !defender) throw new Error("Tried attacking but attacking or defending territory was not set");

            // todo defender amount => niet meegeeven, backend moet maximum pakken
            const attackResult: AttackResult = await attack({gameId, attackerTerritoryName: attacker.name,
                defenderTerritoryName: defender.name, amountOfAttackers: troops, amountOfDefenders: 1});
            await queryClient.invalidateQueries(["game", gameId]);

            if (isTerritoryConquered(defender, attackResult))
                dispatch({type: GameActionType.ANNEXATION_FORTIFICATION});
            else if (!attackerCanStillAttack(attacker, attackResult))
                dispatch({type: GameActionType.CANCEL_ATTACK});

        }
        else if (action === "Fortify") {
            dispatch({type: GameActionType.CLOSE_TROOP_SELECTOR});
            await fortify(gameId, state.selectedStartTerritory!.name, state.selectedEndTerritory!.name, troops);
            await queryClient.invalidateQueries(["game", gameId]);
            dispatch({type: GameActionType.RESET_TERRITORY_STATE});
        }
    }

    const handleExchangeCards = async (cardNames: string[]) => {
        await exchangeCards(gameId, cardNames);
        await queryClient.invalidateQueries(["game", gameId]);
    }

    const selectTerritory = async (e: any, territoryName: string) => {
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

    const handleNextPhase = async () => {
        await nextPhase(gameId);
        await queryClient.invalidateQueries(["game", gameId]);
        dispatch({type: GameActionType.RESET_TERRITORY_STATE});
    }

    const handleNextTurn = async () => {
        await nextTurn(gameId);
        await queryClient.invalidateQueries(["game", gameId]);
        dispatch({type: GameActionType.RESET_TERRITORY_STATE});
    }

    const isUserInTurnAndReinforcement = () => {
        const currentPlayer = game.playersInGame[game.currentPlayerIndex].player;
        return game.phase === Phases.REINFORCEMENT && username === currentPlayer.username;
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
                <Grid item xs={12} display="flex" justifyContent="space-around" alignItems="center">
                    <Fab color="primary" style={{height: "4vw", width: "4vw"}}
                         disabled={!isUserInTurnAndReinforcement()}
                         onClick={() => dispatch({type: GameActionType.OPEN_CARD_SELECTOR})}>
                        <CardsIcon style={{fontSize: "2.5vw"}}/>
                    </Fab>
                    <CurrentPlayer nextPhase={handleNextPhase} nextTurn={handleNextTurn} currentPhase={getPhaseNumber(game.phase)}
                                   currentPlayer={game.playersInGame[game.currentPlayerIndex]}/>
                    {/*just here to make the current player center*/}
                    <div></div>
                </Grid>
            </Grid>

            {/*Dialog component for selecting amount of troops for attack, fortify, etc.*/}
            <TroopSelector isOpen={state.troopState.isOpen} onClose={() => dispatch({type: GameActionType.CLOSE_TROOP_SELECTOR})}
                           onSubmit={troopSelectorFunction}
                           maxTroops={state.troopState.maxTroops}
                           confirmButtonText={state.troopState.buttonText}/>
            {/*Dialog component for selecting cards to exchange*/}
            <CardSelector isOpen={state.isOpenCardSelector} onClose={() => dispatch({type: GameActionType.CLOSE_CARD_SELECTOR})}
                          onSubmit={handleExchangeCards} game={game}/>
            {/*Temporary message for displaying user errors (ex: when user tries to attack from territory with only 1 troop)*/}
            <Snackbar open={state.isOpenErrorToast} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {state.errorToastMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
