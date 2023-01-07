import {useQuery, useQueryClient} from "react-query";
import {getLobby} from "../services/lobbyService";

export function useFriends() {
    const queryClient = useQueryClient();

    // const {
    //     isLoading,
    //     isError,
    //     data: lobby,
    // } = useQuery(['friends'], () => getLobby(id));
}