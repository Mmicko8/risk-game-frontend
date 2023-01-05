import {useQuery} from "react-query";
import {getProfile} from "../services/playerService";

export function useProfile() {
    const {
        isLoading,
        isError,
        data: profile
    } = useQuery(['profile'], () => getProfile())

    return {
        isLoading,
        isError,
        profile
    }
}
