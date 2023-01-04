import {useQuery, useQueryClient} from "react-query";
import {getLobby} from "../services/lobbyService";
import {useState} from "react";

export function useLobby(id: string) {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: lobby,
    } = useQuery(['lobby', id], () => getLobby(id),
        {refetchInterval: 3000, onSuccess: () => queryClient.invalidateQueries(['lobby', id])});

    return {
        isLoading,
        isError,
        lobby
    }
}