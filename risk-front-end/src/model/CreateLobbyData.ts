export type CreateLobbyData = {
    username: string
    amountOfPlayers: number
}

export type CreateLobbyDataNoUsername = Omit<CreateLobbyData, "username">