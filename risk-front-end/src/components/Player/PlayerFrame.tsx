import './PlayerFrame.css'
import {Box} from '@mui/material'
import Avatar from "@mui/material/Avatar";
import {PlayerInGame} from "../../model/player/PlayerInGame";
import Typography from "@mui/material/Typography";
import {getAvatar} from "../../services/utilsService";
import CardIcon from '@mui/icons-material/Style';
import TerritoryIcon from '@mui/icons-material/Flag';
import TroopIcon from '@mui/icons-material/SportsMartialArts';
import {PlayerInGameStats} from "../../model/player/PlayerInGameStats";

interface PlayerFrameProps {
    playerInGame: PlayerInGame;
    currentPlayerName: string;
    playerInGameStats: PlayerInGameStats;
}

export default function PlayerFrame({playerInGame, currentPlayerName, playerInGameStats}: PlayerFrameProps) {
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
            <Avatar sx={{ border: `5px solid ${playerInGame.color}`, width: "6vw", height: "6vw" }}
                    src={getAvatar(playerInGame.player.profilePicture)}/>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", height: "100%", width: "151px"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography sx={{fontWeight: "bold"}}>{playerInGame.player.username}</Typography>
                    {playerInGame.player.title === null ? ""
                        :
                        <Typography sx={{fontStyle: "italic", textAlign: "center", marginTop: "4px"}}>
                            "{playerInGame.player.title}"
                        </Typography>
                    }
                </div>
                <div style={{display: "flex"}}>
                    <div style={{marginLeft: "10px", marginRight: "10px", textAlign: "center"}}>
                        <CardIcon sx={{fontSize: "28px"}}/>
                        <span>{playerInGameStats.amountOfCards}</span>
                    </div>
                    <div style={{marginLeft: "10px", marginRight: "10px", textAlign: "center"}}>
                        <TerritoryIcon sx={{fontSize: "28px"}}/>
                        <span>{playerInGameStats.amountOfTerritories}</span>
                    </div>
                    <div style={{marginLeft: "10px", marginRight: "10px", textAlign: "center"}}>
                        <TroopIcon sx={{fontSize: "28px"}}/>
                        <span>{playerInGameStats.amountOfTroops}</span>
                    </div>
                </div>
            </div>
        </Box>
    );
}