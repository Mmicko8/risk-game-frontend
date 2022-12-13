import {useMutation} from "react-query";
import {CreateLobbyData} from "../model/CreateLobbyData";
import {createLobby} from "../services/lobbyService";

export function useLobbies() {
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