import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {itemNameToImage} from "../services/shopItemService";
import Button from "@mui/material/Button";
import React from "react";
import {Player} from "../model/player/Player";

interface FriendProps {
    player: Player
}

export default function Friend({player}:FriendProps) {
    return (
        <Card sx={{width: "340px", display: "flex", justifyContent: "space-between"}}>
            <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "start"}}>
                <div>
                    <Typography variant="h6" component="div">
                        {player.username}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                            Games won: {player.gamesWon}
                    </Typography>
                </div>
                {/*<Button onClick={() => action(item.shopItemId)}>{actionType}</Button>*/}
            </CardContent>
            <CardMedia
                component="img"
                sx={{width: 151}}
                image={itemNameToImage(player.profilePicture)}
                alt={player.profilePicture}
            />
        </Card>
    )
}