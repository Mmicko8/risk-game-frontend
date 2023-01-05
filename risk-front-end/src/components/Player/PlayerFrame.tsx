import './PlayerFrame.css'
import Box from '@mui/material/Box'
import Avatar from "@mui/material/Avatar";
import {PlayerInGame} from "../../model/PlayerInGame";
import Typography from "@mui/material/Typography";

interface PlayerFrameProps {
    playerInGame: PlayerInGame;
    currentPlayerName: string;
}

export default function PlayerFrame({playerInGame, currentPlayerName}: PlayerFrameProps) {
    const borderColor = () => {
        if(playerInGame.player.username === currentPlayerName) {
            return 'red';
        }
    }
    const borderSize = () => {
        if(playerInGame.player.username === currentPlayerName) {
            return 2;
        } else {
            return 1;
        }
    }

    return (
        <Box className="playerFrameBox" sx={{border: borderSize(), borderRadius: 3, borderColor: borderColor()}}>
            <Avatar sx={{ border: `5px solid ${playerInGame.color}` ,width: "6vw", height: "6vw" }}
                    src={`/avatar/${playerInGame.player.profilePicture}.png`}/>
            <Typography>{playerInGame.player.username}</Typography>
        </Box>
    );
}