import {useQuery} from "react-query";
import {getLocalPlayers} from "../services/playerService";

export function useLocalPlayers() {
    const {
        isLoading,
        isError,
        data: players
    } = useQuery(['localPlayers'], () => getLocalPlayers())

    return {
        isLoading,
        isError,
        players
    }
}