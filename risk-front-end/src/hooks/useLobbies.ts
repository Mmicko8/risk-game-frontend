import {useQuery} from "react-query";
import {getFirstNLobbies} from "../services/lobbyService";

export function useLobbies(amount: number, username: string | null) {
    const {
        isLoading,
        isError,
        data: lobbies
    } = useQuery(['lobbies'], () => getFirstNLobbies(amount, username))

    return {
        isLoading,
        isError,
        lobbies
    }
}