import {useMutation} from "react-query";
import {CreateLobbyData} from "../model/CreateLobbyData";
import {createLobby} from "../services/lobbyService";

export function useLobby(id: string) {
    const {
        mutate: createLobbyMutate,
        isLoading: isCreatingLobby,
        isError: isErrorCreatingLobby,
    } = useMutation((createLobbyData: CreateLobbyData) => createLobby(createLobbyData.username, createLobbyData.amountOfPlayers), {

    })

    return {
        createLobbyMutate,
        isCreatingLobby,
        isErrorCreatingLobby
    }
}