import {TerritoryModel} from "../model/TerritoryModel";
import {GameModel} from "../model/GameModel";
import {GameActionType} from "../services/gameService";
import {PlayerInGame} from "../model/PlayerInGame";
import {getAttackableTerritoryNames, getMaxTroopsForAttack} from "../services/attackService";
import {getFortifiableTerritoryNames} from "../services/fortifyService";
import {getTerritoryData} from "../services/territoryService";

interface TroopSelectorState {
    isOpen: boolean;
    buttonText: string;
    maxTroops: number;
}

interface InteractionGameState {
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
    payload?: GameActionPayload;
}

interface GameActionPayload {
    game: GameModel; // BEWARE: contains territories BUT WITHOUT neighbors, use 'territories' from payload instead
    selectedTerritoryName: string;
    territories: TerritoryModel[]; // contains neighbors when necessary (e.g. attack or fortify, NOT for reinforce)
}


// returns new state if action is of a payloadless type, otherwise returns null so that actions with payload can be handled by gameInteractionStateReducer
function gameInteractionStateReducerWithoutPayload(state: InteractionGameState, action: GameAction) {
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

function reinforcementReducer(state: InteractionGameState, selectedTerritory: TerritoryModel, currentPlayer: PlayerInGame) {
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
}

function attackReducer(state: InteractionGameState, territories: TerritoryModel[], selectedTerritory: TerritoryModel, currentPlayer: PlayerInGame) {
    // check if selected territory is your own territory, to attack from
    if (selectedTerritory.ownerId === currentPlayer.playerInGameId) {
        // can't attack if territory has less than 2 troops
        if (selectedTerritory.troops < 2) return {...state,
            errorToastMessage: "Territory must at least have 2 troops to attack!",
            isOpenErrorToast: true,
            attackableTerritoryNames: []
        };

        return {...state,
            selectedStartTerritory: selectedTerritory,
            attackableTerritoryNames: getAttackableTerritoryNames(territories, selectedTerritory)
        };
    }

    // if selected territory is not your own territory it will select it for attack, unless startTerritory is null
    if (!state.selectedStartTerritory) return state;

    // check if selected territory to attack is attackable neighbor
    const attackableTerritoryNames = getAttackableTerritoryNames(territories, state.selectedStartTerritory);
    if (!attackableTerritoryNames.includes(selectedTerritory.name)) return state;

    return {...state,
        selectedEndTerritory: selectedTerritory,
        troopState: {
            maxTroops: getMaxTroopsForAttack(state.selectedStartTerritory.troops),
            buttonText: "Attack",
            isOpen: true
        }

    }
}

function fortificationReducer(state: InteractionGameState, territories: TerritoryModel[], selectedTerritory: TerritoryModel, currentPlayer: PlayerInGame) {
    if (selectedTerritory.ownerId !== currentPlayer.playerInGameId) return state;

    if (!state.selectedStartTerritory) {
        if (selectedTerritory.troops < 2) return {...state,
            errorToastMessage: "Territory must at least have 2 troops to fortify!",
            isOpenErrorToast: true,
            fortifiableTerritoryNames: []
        };

        return {...state,
            selectedStartTerritory: selectedTerritory,
            fortifiableTerritoryNames: getFortifiableTerritoryNames(territories, selectedTerritory),
        }
    }
    // if selected territory is not your own territory it will select it for fortification

    // check if selected territory to attack is fortifiable neighbor
    const fortifiableTerritoryNames = getFortifiableTerritoryNames(territories, state.selectedStartTerritory);
    if (!fortifiableTerritoryNames.includes(selectedTerritory.name)) return state;

    return {...state,
        selectedEndTerritory: selectedTerritory,
        troopState: {
            maxTroops: state.selectedStartTerritory.troops - 1,
            buttonText: "Fortify",
            isOpen: true
        }
    }
}

export function GameInteractionStateReducer(state: InteractionGameState, action: GameAction) {
    const result = gameInteractionStateReducerWithoutPayload(state, action);
    if (result) return result;

    if (!action.payload) return state;
    const pl = action.payload;
    const currentPlayer = pl.game.playersInGame[pl.game.currentPlayerIndex];

    const selectedTerritory = getTerritoryData(pl.territories, pl.selectedTerritoryName);
    if (!selectedTerritory) return state;

    switch (action.type) {
        case GameActionType.REINFORCEMENT:
            return reinforcementReducer(state, selectedTerritory, currentPlayer);

        case GameActionType.ATTACK:
            return attackReducer(state, pl.territories, selectedTerritory, currentPlayer);

        case GameActionType.FORTIFICATION:
            return fortificationReducer(state, pl.territories, selectedTerritory, currentPlayer)

        default: return state;
    }
}