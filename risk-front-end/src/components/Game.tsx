import Board from "./Board";
import {useQuery, useQueryClient} from "react-query";
import {getGameState, Phases} from "../services/gameService";
import Loading from "./Loading";
import {Alert} from "@mui/material";
import {getAllTerritoriesFromGameState, getOwnerOfTerritory, getTerritoryData} from "../services/territoryService";
import GameStateContextProvider from "../context/GameStateContextProvider";
import {useContext, useState} from "react";
import AccessContext from "../context/AccessContext";
import ReinforceDialog from "./ReinforceDialog";
import axios from "axios";
import {TerritoryModel} from "../model/TerritoryModel";
import PlayerFrame from "./PlayerFrame";
import Grid from "@mui/material/Grid";

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
    console.log(game);

    return (
        <>
            <div style={{backgroundColor: "lightblue"}}>
                <Grid container>
                    <Grid item xs={10}>
                        <GameStateContextProvider game={game}>
                            <Board selectTerritory={selectTerritory} territories={getAllTerritoriesFromGameState(game)}/>
                        </GameStateContextProvider>
                    </Grid>
                    <Grid item xs={2}>
                        <PlayerFrame/>
                    </Grid>
                </Grid>
            </div>
            {/*TODO fix maxTroops*/}
            <ReinforceDialog isOpen={isReinforceDialogOpen} onClose={() => setReinforceDialogOpen(false)}
                             onSubmit={reinforceTerritory} maxTroops={20}/>
        </>
    );
}
