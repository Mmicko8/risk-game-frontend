import axios from "axios";
import {Game} from "../model/Game";

export async function getGameState(gameId: number) {
    const response = await axios.get<Game>(`/api/game/${gameId}`); // todo
    return response.data;
}