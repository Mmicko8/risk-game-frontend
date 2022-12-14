import {useQuery} from "react-query";
import {getFirstNLobbies} from "../services/lobbyService";

export function useLobbies(amount: number) {
    const {
        isLoading,
        isError,
        data: lobbies
    } = useQuery(['lobbies'], () => getFirstNLobbies(amount))

    return {
        isLoading,
        isError,
        lobbies
    }
}