import {useQuery} from "react-query";
import {getLobby} from "../services/lobbyService";

export function useLobby(id: string) {
    const {
        isLoading,
        isError,
        data: lobby,
    } = useQuery(['item', id], () => getLobby(id));

    return {
        isLoading,
        isError,
        lobby
    }
}