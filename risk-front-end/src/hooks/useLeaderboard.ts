import {useQuery} from "react-query";
import {getLeaderboard} from "../services/leaderboardService";

export function useLeaderboard() {
    const {
        isLoading,
        isError,
        data: players
    } = useQuery(['leaderboard'], () => getLeaderboard())

    return {
        isLoading,
        isError,
        players
    }
}